import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import retry from 'retry';
import { useAppDispatch, useAppContext } from '../index';

const retryOption = {
    retries: 10,
    minTimeout: 250,
    maxTimeout: 1000,
    randomize: 2
};

const Updater = () => {
    const { chainId, library } = useWeb3React()
    
    const { blockNumber, transactions } = useAppContext();
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

        transactions.forEach(transaction => {
            const { hash } = transaction;
            getReceipt(hash, (err, receipt) => {
                if (err || !receipt) {
                    return;
                }
            });
        })

    }, [chainId, library, blockNumber, transactions, dispatch, getReceipt])

    return null;
};

export default Updater
