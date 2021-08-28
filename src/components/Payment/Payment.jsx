import PaymentForm from './PaymentForm.jsx'
import { Box, Card } from "@material-ui/core";

const Payment = () => {

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={6}
        >
            <Card variant="outlined">
                <Box p={4}>
                    <PaymentForm />
                </Box>
            </Card>
        </Box>
    )
};

export default Payment;