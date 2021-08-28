import { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { AppBar, Box, Button, Chip } from '@material-ui/core';
import WalletModal from './WalletModal.jsx';

const Root = styled(AppBar)({
    boxShadow: 'none',
    backgroundColor: 'transparent',
    position: 'relative'
})

const Header = () => {
    const [showWalletModal, setShowWalletModal] = useState(false);
    const handleClickConnect = () => setShowWalletModal(prev => !prev);

    return (
        <Root>
            <Box
                m={3}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
            >
                <Box mx={1}>
                    <Chip label="Network" />
                </Box>
                <Box mx={1}>
                    <Button onClick={handleClickConnect}>Connect</Button>
                </Box>
            </Box>
            <WalletModal
                open={showWalletModal}
                onClose={handleClickConnect}
            />
        </Root>
    )
};

export default Header;