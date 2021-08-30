import { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils'
import { useAppContext } from '../state'

function useBalance() {
    const [balance, setBalance] = useState(null);
    const { account, library, chainId } = useWeb3React();
    const { blockNumber } = useAppContext();

    useEffect(() => {
        async function fetch() {
            try {
                if (account && library) {
                    const balance = await library.getBalance(account);
                    if (balance) {
                        setBalance(formatEther(balance));
                    }
                } else {
                    setBalance(null);
                }
            } catch (e) { setBalance(null); }
        }
        fetch();
    }, [account, library, chainId, blockNumber])

    return useMemo(() => balance, [balance])
};

export default useBalance;