import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Typography } from '@material-ui/core';
import WalletModal from './WalletModal.jsx';

const useStyles = makeStyles((theme) => {
    const common = {
        background: theme.palette.grey[700],
        color: '#fff',
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        textTransform: 'initial',
        '&:hover': {
            backgroundColor: theme.palette.grey[800],
        },
    };
    return {
        bar: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
            position: 'relative',
            fontSize: 'bold',
        },
        btn: common,
        account: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: 120,
        },
    };
});

const Header = () => {
    const classes = useStyles();
    const [showWalletModal, setShowWalletModal] = useState(false);
    const { account } = useWeb3React();

    const handleClickConnect = () => setShowWalletModal((prev) => !prev);

    return (
        <AppBar className={classes.bar}>
            <Box p={3} display="flex" alignItems="center" justifyContent="flex-end">
                {account ? (
                    <Button className={classes.btn} onClick={handleClickConnect}>
                        <Typography className={classes.account}>{account}</Typography>
                    </Button>
                ) : (
                    <Button className={classes.btn} onClick={handleClickConnect}>
                        Connect
                    </Button>
                )}
            </Box>
            <WalletModal open={showWalletModal} onClose={handleClickConnect} />
        </AppBar>
    );
};

export default Header;
