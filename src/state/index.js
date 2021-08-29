import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useAppDispatch } from '../store';
import useDebounce from '../hooks/useDebounce';

const Updater = () => {
    const dispatch = useAppDispatch();
    const { chainId, library } = useWeb3React()
    const [state, setState] = useState({
        chainId,
        blockNumber: null
    });

    const blockNumberCallback = useCallback(
        (blockNumber) => {
            setState((state) => {
                if (chainId === state.chainId) {
                    if (typeof state.blockNumber !== 'number') return { chainId, blockNumber }
                    return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) }
                }
                return state
            });
        },
        [chainId, setState]
    );

    useEffect(() => {
        if (!(chainId && library)) return

        setState({ chainId, blockNumber: null });

        library
            .getBlockNumber()
            .then(blockNumberCallback)
            .catch((error) => console.error(`Failed to get block number for chainId: ${chainId}`, error))
        library.on('block', blockNumberCallback)
        return () => {
            library.removeListener('block', blockNumberCallback)
        }
    }, [chainId, library])

    const debouncedState = useDebounce(state)
    
    useEffect(() => {
        if (!(debouncedState.chainId && debouncedState.blockNumber)) return
        dispatch({
            type: 'UPDATE_CHAIN_ID',
            payload: { chainId: debouncedState.chainId }
        });
        dispatch({
            type: 'UPDATE_BLOCK_NUMBER',
            payload: { blockNumber: debouncedState.blockNumber }
        });
    }, [dispatch, debouncedState.blockNumber, debouncedState.chainId])
    
    useEffect(() => {
        dispatch({
            type: 'UPDATE_CHAIN_ID',
            payload: { chainId: debouncedState.chainId ?? null }
        });
    }, [dispatch, debouncedState.chainId])

    return null;
};

export default Updater
