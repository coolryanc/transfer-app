import { InjectedConnector } from '@web3-react/injected-connector';
// icons
import MetaMaskIcon from '../assets/metamask.png';

const SupportedChainId = Object.freeze({
    MAINNET: 1,
    ROPSTEN: 3
});

const injected = new InjectedConnector({
    supportedChainIds: [SupportedChainId.ROPSTEN],
});

export const supportedWallet = [
    {
        connector: injected,
        name: 'MetaMask',
        icon: MetaMaskIcon
    }
];