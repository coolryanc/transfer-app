import { InjectedConnector } from '@web3-react/injected-connector';
// icons
import MetaMaskIcon from '../assets/metamask.png';
// constants
import { SupportedChainId } from '../constants';

const injected = new InjectedConnector({
    supportedChainIds: [SupportedChainId.ROPSTEN],
});

export const supportedWallet = [
    {
        connector: injected,
        name: 'MetaMask',
        icon: MetaMaskIcon,
    },
];
