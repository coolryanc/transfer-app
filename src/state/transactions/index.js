import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from 'notistack';
import retry from 'retry';
import { useAppDispatch, useAppContext } from '../index';
// utils
import { shortenAddress } from '../../utils/address'

const retryOption = {
    retries: 10,
    minTimeout: 250,
    maxTimeout: 1000,
    randomize: 2
};

const Updater = () => {
    const { chainId, library } = useWeb3React()
    const { blockNumber, transactions } = useAppContext();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    const getReceipt = useCallback(
        (hash, callback) => {
            if (!(library && chainId)) throw new Error('No library or chainId.')
            const operation = retry.operation(retryOption);
            operation.attempt(function(currentAttempt) {
                library
                    .getTransactionReceipt(hash)
                    .then((receipt) => {
                        if (receipt === null) {
                            throw new Error('Null receipt.')
                        }
                        return callback(null, receipt);
                    })
                    .catch(err => {
                        if (operation.retry(err)) {
                            return;
                        }
                        return callback(err);
                    })
            });

        },
        [chainId, library]
    );


    useEffect(() => {
        if (!chainId || !library || !blockNumber) return

        Object.keys(transactions)
            .filter(hash => !transactions?.[hash]?.receipt)
            .forEach(hash => {
                getReceipt(hash, (err, receipt) => {
                    if (err || !receipt) {
                        return;
                    }

                    enqueueSnackbar(`Sending ETH from ${shortenAddress(receipt.from)} to ${shortenAddress(receipt.to)} success.`);

                    dispatch({ type: 'UPDATE_TRANSACTION', payload: {
                        transaction: {
                            ...transactions?.[hash],
                            receipt
                        }
                    }});

                    if (receipt?.blockNumber > blockNumber) {
                        dispatch({
                            type: 'UPDATE_BLOCK_NUMBER',
                            payload: { blockNumber: receipt?.blockNumber }
                        });
                    }
                });
            });

    }, [chainId, library, blockNumber, transactions, dispatch, getReceipt])

    return null;
};

export default Updater
