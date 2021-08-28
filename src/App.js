import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
// material
import { styled } from '@material-ui/core/styles';
// components
import Header from './components/Header';
import Payment from './components/Payment';
// theme
import Theme from './theme';
// utils
import getLibrary from './utils/getLibrary';

const RootStyle = styled('div')({
    minHeight: '100vh',
});

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK');

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Theme>
                    <RootStyle>
                        <Header />
                        <main>
                            <Payment />
                        </main>
                    </RootStyle>
                </Theme>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
}

export default App;
