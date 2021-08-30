import { useEffect, useMemo, useState } from 'react';
import { useAppContext } from '../state'

function usePendingTransactions() {
    const [pending, setPending] = useState([]);
    const { blockNumber, transactions } = useAppContext();

    useEffect(() => {
        setPending(
            Object
                .keys(transactions)
                .filter(hash => !transactions[hash]?.receipt)
                .map(hash => transactions[hash])
        );
    }, [transactions, blockNumber]);

    return useMemo(() => pending, [pending])
}

export default usePendingTransactions;