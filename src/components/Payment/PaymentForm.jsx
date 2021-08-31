import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from "react-number-format";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box, CircularProgress, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSnackbar } from 'notistack';
// state
import { useAppDispatch } from '../../state';
// utils
import { utils } from 'ethers';

const formInitValues = { address: "", amount: 0.0 };
const useStyles = makeStyles((theme) => ({
    text: {
        marginLeft: theme.spacing(1),
    },
}));

const PaymentForm = () => {
    const classes = useStyles();
    const { library } = useWeb3React();
    const { enqueueSnackbar } = useSnackbar();
    const { control, handleSubmit, reset } = useForm();
    const dispatch = useAppDispatch();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!library) {
            reset({ ...formInitValues });
        }
    }, [library, reset]);

    const onSubmit = async (data) => {
        const { address, amount } = data;
        try {
            setPending(true);
            const signer = library.getSigner();
            const transaction = await signer.sendTransaction({
                to: address,
                value: utils?.parseEther(amount.replace('$ ', ''))
            });
            setError('');
            dispatch({ type: 'ADD_TRANSACTION', payload: { transaction }});
            const { hash } = transaction;
            enqueueSnackbar(
                <div>
                    <span>{`Send ${amount} ETH success.`}</span>
                    <a
                        href={`https://ropsten.etherscan.io/tx/${hash}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className={classes.text}
                    >
                        View on Explorer
                    </a>
                </div>
            );
            reset({ ...formInitValues });
        } catch (error) {
            setError(error?.reason ?? 'Failed.');
        }

        setPending(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} onChange={() => setError('')}>
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
                        disabled={pending}
                        required
                        {...field}
                    />
                )}
                name="address"
                control={control}
                className="materialUIInput"
            />
            <Controller
                render={({ field }) => (
                    <NumberFormat
                        thousandSeparator={true}
                        decimalScale={5}
                        decimalSeparator="."
                        prefix="$ "
                        allowNegative={false}
                        customInput={TextField}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Amount"
                        disabled={pending}
                        required
                        {...field}
                    />
                )}
                name="amount"
                control={control}
            />
            <Box mt={2}>
                <Button
                    type="submit"
                    color="primary"
                    size="large"
                    variant="outlined"
                    fullWidth
                    disabled={!library || pending}
                >
                    <Box p={1}>
                        {pending ? <CircularProgress size={16} /> : 'Send'}
                    </Box>
                </Button>
            </Box>
            {error && (
                <Box mt={2}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            )}
        </form>
    );
};

export default PaymentForm;
