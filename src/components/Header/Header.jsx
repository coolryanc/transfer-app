import { AppBar, Box, Button, Chip } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const Root = styled(AppBar)({
    boxShadow: 'none',
    backgroundColor: 'transparent',
    position: 'relative'
})

const Header = () => {
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
                    <Button>Connect</Button>
                </Box>
            </Box>
        </Root>
    )
};

export default Header;