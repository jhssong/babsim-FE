import { CallSplitOutlined } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

const ForkBtn = () => {
  return (
    <Button
      startIcon={
        <CallSplitOutlined
          sx={{
            minWidth: 'auto',
            minHeight: 'auto',
            padding: 0,
            width: '32px',
            height: '32px',
          }}
        />
      }
      variant="contained"
      color="primary">
      <Typography variant="button" fontWeight="bold">
        포크하기
      </Typography>
    </Button>
  );
};

export default ForkBtn;
