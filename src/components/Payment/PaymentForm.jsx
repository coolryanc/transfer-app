import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, TextField, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
    text: {
        marginLeft: theme.spacing(1),
    },
}));

const PaymentForm = () => {
    const classes = useStyles();
    const { control, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" alignItems="center" mb={2}>
                <InfoOutlinedIcon />
                <Typography className={classes.text}>Transer Your ETH.</Typography>
            </Box>
            <Controller
                render={({ field }) => (
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Address"
                        {...field}
                    />
                )}
                name="address"
                control={control}
                defaultValue=""
                className="materialUIInput"
            />
            <Controller
                render={({ field }) => (
                    <TextField
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Amount"
                        {...field}
                    />
                )}
                name="value"
                control={control}
                defaultValue=""
                className="materialUIInput"
            />
            <Box mt={2}>
                <Button type="submit" fullWidth>
                    Send
                </Button>
            </Box>
        </form>
    );
};

export default PaymentForm;
