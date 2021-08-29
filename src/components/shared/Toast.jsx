import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Box, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles((theme) => ({
    paper: {
        minWidth: 200,
        maxWidth: 440,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        positon: 'relative'
    },
    success: {
        color: '#228B22',
    },
    close: {
        position: 'absolute',
        padding: 4,
        top: 6,
        right: 6,
        borderRadius: 12,
        cursor: 'pointer',
        background: theme.palette.grey[100],
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        }
    }
}));


const Toast = ({ id, message }, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const handleClose = () => closeSnackbar(id);

    return (
        <Paper elevation={0} ref={ref} className={classes.paper}>
            <Box padding={2} paddingY={3} paddingRight={5} display="flex" alignItems="center">
                <CheckCircleOutlineOutlinedIcon className={classes.success} />
                <Box ml={1}>
                    {message ?? 'message'}
                </Box>
            </Box>
            <Box className={classes.close} onClick={handleClose} display="flex" alignItems="center">
                <CloseOutlinedIcon />
            </Box>
        </Paper>
    );
};

Toast.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.oneOf(['success', 'info', 'warrning', 'error'])
};
export default forwardRef(Toast);