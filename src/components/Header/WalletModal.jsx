import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    Chip,
    CircularProgress,
    Fade,
    Modal,
    Paper,
    Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SettingsEthernetOutlinedIcon from '@material-ui/icons/SettingsEthernetOutlined';
// connector
import { supportedWallet } from '../../connectors';
// constants
import { ChainIdInfo } from '../../constants';

const useStyles = makeStyles((theme) => ({
    text: {
        marginLeft: theme.spacing(1),
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '400px',
    },
    img: {
        objectFit: 'cover',
        width: '24px',
    },
    option: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
}));

const WalletOption = ({ connector, name, icon, handleActivation }) => {
    const classes = useStyles();

    return (
        <Box mt={2}>
            <Card
                variant="outlined"
                className={classes.option}
                onClick={() => handleActivation(connector, name)}
            >
                <Box display="flex" alignItems="center" p={2}>
                    <img src={icon} alt={name} className={classes.img} />
                    <Typography className={classes.text}>{name}</Typography>
                </Box>
            </Card>
        </Box>
    );
};

const WalletModal = ({ open, onClose }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { account, activate, chainId, deactivate } = useWeb3React();
    const chainInfo = ChainIdInfo?.[chainId];

    const handleOnClose = () => {
        setError('');
        onClose();
    };
    const handleActivation = (connector, name) => {
        setLoading(true);
        activate(connector, undefined, true)
            .then(() => {
                onClose();
                setError('');
            })
            .catch((error) => {
                if (error) {
                    setError(`Connet ${name} failed.`);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Modal open={open} onClose={handleOnClose}>
            <Fade in={open} easing="out">
                <Box className={classes.modal}>
                    <Paper elevation={0}>
                        <Box p={4}>
                            <Box display="flex" alignItems="center" mb={2}>
                                {account ? (
                                    <AccountCircleOutlinedIcon />
                                ) : (
                                    <SettingsEthernetOutlinedIcon />
                                )}
                                <Typography className={classes.text}>
                                    {account ? 'Account info.' : 'Connect to a wallet.'}
                                </Typography>
                            </Box>
                            {account ? (
                                <Box>
                                    <Box mb={2}>
                                        <Chip label={chainInfo} color="primary" />
                                    </Box>
                                    <Card variant="outlined" className={classes.option}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            p={2}
                                            onClick={deactivate}
                                        >
                                            <Typography>Disconnect</Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            ) : (
                                <Box>
                                    {!loading ? (
                                        supportedWallet.map((config, idx) => (
                                            <WalletOption
                                                key={`support-wallet-${idx}`}
                                                {...config}
                                                handleActivation={handleActivation}
                                            />
                                        ))
                                    ) : (
                                        <Card variant="outlined" className={classes.option}>
                                            <Box display="flex" alignItems="center" p={2}>
                                                <CircularProgress size={16} />
                                                <Typography className={classes.text}>
                                                    Initializing ...
                                                </Typography>
                                            </Box>
                                        </Card>
                                    )}
                                </Box>
                            )}

                            {error && (
                                <Box mt={3}>
                                    <Alert severity="error">{error}</Alert>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Fade>
        </Modal>
    );
};

WalletModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default WalletModal;
