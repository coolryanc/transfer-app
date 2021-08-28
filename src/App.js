import { styled } from '@material-ui/core/styles';
// components
import Header from './components/Header';
import Payment from './components/Payment';
// theme
import Theme from './theme';

const RootStyle = styled('div')({
    minHeight: '100vh',
    overflow: 'hidden'
});

function App() {
    return (
        <Theme>
            <RootStyle>
                <Header />
                <main>
                    <Payment />
                </main>
            </RootStyle>
        </Theme>
    );
}

export default App;
