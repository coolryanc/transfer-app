import PropTypes from 'prop-types';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const Theme = ({ children }) => {
    const theme = createTheme({
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '*': {
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box',
                    },
                    html: {
                        width: '100%',
                        height: '100%',
                    },
                    body: {
                        width: '100%',
                        height: '100%',
                    },
                    '#root': {
                        width: '100%',
                        height: '100%'
                    }
                },
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};


Theme.propTypes = {
    children: PropTypes.node
};
export default Theme;