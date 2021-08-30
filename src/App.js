import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { SnackbarProvider } from 'notistack';
// material
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
// components
import Header from './components/Header';
import Payment from './components/Payment';
import Toast from './components/shared/Toast.jsx';
// state
import { AppProvider } from './state';
import AppUpdater from './state/app'
// theme
import Theme from './theme';
// utils
import getLibrary from './utils/getLibrary';

const RootStyle = styled('div')({
    minHeight: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
});

const Web3ProviderNetwork = createWeb3ReactRoot();

function Updaters() {
    return (
        <>
            <AppUpdater />
        </>
    );
}

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
                <Theme>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        content={(key, message) => (
                            <Toast id={key} message={message} />
                        )}
                    >
                        <AppProvider>
                            <Updaters />
                            <RootStyle>
                                <Header />
                                <main>
                                    <Payment />
                                </main>
                                <footer>
                                    <Box paddingY={4}>© 2021 ryanC1993.</Box>
                                </footer>
                            </RootStyle>
                        </AppProvider>
                    </SnackbarProvider>
                </Theme>
            </Web3ProviderNetwork>
        </Web3ReactProvider>
    );
}

export default App;
