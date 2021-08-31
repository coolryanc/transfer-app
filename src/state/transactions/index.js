import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from 'notistack';
import retry from 'retry';
import { useAppDispatch, useAppContext } from '../index';
// utils
import { shortenAddress } from '../../utils/address'

const retryOption = {
    retries: 1,
    minTimeout: 150,
    maxTimeout: 500,
    randomize: 2
};

const shouldCheck = ({ receipt }) => {
    if (receipt) return false;
    return true;
}

const Updater = () => {
    const { chainId, library } = useWeb3React()
    const { blockNumber, transactions } = useAppContext();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    const getReceipt = useCallback(
        (hash) => {
            if (!(library && chainId)) throw new Error('No library or chainId.')
            const operation = retry.operation(retryOption);
            let completed = false;
            let rejectCancelled = () => {};

            const promise = new Promise((reslove, reject) => {
                rejectCancelled = reject;
                operation.attempt(function(currentAttempt) {
                    library
                        .getTransactionReceipt(hash)
                        .then((receipt) => {
                            if (receipt === null) {
                                throw new Error('Null receipt.')
                            }
                            completed = true;
                            reslove(receipt);
                        })
                        .catch(err => {
                            if (operation.retry(err)) {
                                return;
                            }
                            completed = true;
                            reslove(null)
                        })
                });
            });

            return {
                promise,
                cancel: () => {
                    if (completed) return;
                    completed = true;
                    rejectCancelled(new Error('Cancel retry.'));
                }
            }
        },
        [chainId, library]
    );


    useEffect(() => {
        if (!chainId || !library || !blockNumber) return

        const cancels = Object.keys(transactions)
            .filter(hash => shouldCheck(transactions?.[hash]))
            .map(hash => {
                const { promise, cancel } = getReceipt(hash);
                promise.then(receipt => {
                    if (receipt) {
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
                    }
                }).catch(e => {
                    console.log(`Error: ${hash}`);
                });

                return cancel;
            });

        return () => {
            cancels.forEach(cancel => cancel());
        }
    }, [chainId, library, blockNumber, transactions, dispatch, getReceipt, enqueueSnackbar])

    return null;
};

export default Updater
