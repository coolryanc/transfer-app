export const SupportedChainId = Object.freeze({
    MAINNET: 1,
    ROPSTEN: 3,
});

export const ChainIdInfo = Object.freeze(
    Object.keys(SupportedChainId).reduce((acc, name) => {
        const id = SupportedChainId[name];
        acc[id] = name;
        return acc;
    }, {})
);
