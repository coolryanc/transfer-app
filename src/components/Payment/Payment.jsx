import { Box, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import PaymentForm from './PaymentForm.jsx';

const CardContainer = styled(Box)({
    width: '100%',
    maxWidth: 440
})

const Payment = () => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" pb={12}>
            <CardContainer>
                <Card variant="outlined">
                    <Box p={4}>
                        <PaymentForm />
                    </Box>
                </Card>
            </CardContainer>
        </Box>
    );
};

export default Payment;
