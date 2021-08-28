import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Fade, Modal, Paper, Typography } from '@material-ui/core';
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
// connector
import { supportedWallet } from '../../connectors'

const useStyles = makeStyles((theme) => ({
    text: {
        marginLeft: theme.spacing(1)
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '400px'
    },
    img: {
        objectFit: 'cover',
        width: '24px'
    },
    option: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[100]
        }
    }
}));

const WalletOption = ({ connector, name, icon }) => {
    const classes = useStyles();

    return (
        <Box mb={2}>
            <Card variant="outlined" className={classes.option}>
                <Box display="flex" alignItems="center" p={2}>
                    <img src={icon} alt={name} className={classes.img}/>
                    <Typography className={classes.text}>{name}</Typography>
                </Box>
            </Card>
        </Box>
    )
}

const WalletModal = ({ open, onClose }) => {
    const classes = useStyles();

    return (
        <Modal open={open} onClose={onClose}>
            <Fade in={open} easing="enter">
                <Box className={classes.modal}>
                    <Paper elevation={0}>
                        <Box p={4}>
                            <Box display="flex" alignItems="center" mb={3}>
                                <SettingsEthernetOutlinedIcon />
                                <Typography className={classes.text}>Connect to a wallet.</Typography>
                            </Box>
                            <Box>
                                {supportedWallet.map((config, idx) => (
                                    <WalletOption
                                        key={`support-wallet-${idx}`}
                                        {...config}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    )
};


WalletModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}
export default WalletModal;