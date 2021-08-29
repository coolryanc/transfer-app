import { getAddress } from 'ethers/lib/utils';

export const isValidAddress = (addr) => {
    return !!getAddress(addr)
};

export const shortenAddress = (addr) => {
    const chars = 4;

    if (isValidAddress(addr)) {
        return `${addr.substring(0, chars + 2)}...${addr.substring(42 - chars)}`
    }

    return '';
}