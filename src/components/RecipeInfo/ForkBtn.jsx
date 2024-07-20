import { Button, Typography } from '@mui/material';
import React from 'react';

const ForkSvg = (props) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.9999 0C7.16339 0 0 7.16344 0 16V16.0283C0 16.0383 0.000499996 16.0481 0.000499996 16.0581C0.00112499 16.2344 0.00456247 16.4108 0.0108541 16.587C0.0114583 16.6036 0.0119582 16.6201 0.0126041 16.6367C0.315456 24.7337 6.63391 31.2921 14.6293 31.9704L14.6265 31.9416C15.0833 31.9805 15.5415 32 16 32C16.4535 32 16.9069 31.9809 17.3588 31.9427L17.3559 31.9717C25.3589 31.3001 31.6852 24.7377 31.9874 16.6349C31.988 16.6199 31.9885 16.6049 31.9891 16.5898C31.9953 16.4127 31.9988 16.2354 31.9995 16.0581C31.9995 16.0481 32 16.0383 32 16.0283V16C32 7.16344 24.8364 0 15.9999 0ZM12.4025 6.66421C12.3172 10.6459 12.1251 15.7678 12.5314 20.1137C12.6898 21.8083 14.7049 21.8316 14.7736 20.1137C14.9506 15.6938 15.104 11.0805 15.334 6.68204H16.669C16.899 11.0805 16.9499 15.6804 17.2115 20.0304C17.3213 21.8564 19.2796 21.8824 19.4538 20.0304C19.8671 15.6352 19.6781 10.6212 19.6183 6.66423H20.986C21.6889 12.0166 22.0986 17.63 21.5696 21.534C21.0406 25.438 18.5338 24.8055 17.7806 28.859C17.6676 29.4668 17.5724 30.0913 17.4925 30.7255C16.495 30.8253 15.4899 30.8248 14.4925 30.7241C14.4126 30.0904 14.3175 29.4664 14.2045 28.859C13.4513 24.7998 10.9444 25.438 10.4155 21.534C9.88647 17.6357 10.2949 11.9053 11.0349 6.66421H12.4025Z"
      fill="white"
    />
  </svg>
);

const ForkBtn = () => {
  return (
    <Button startIcon={<ForkSvg />} variant="contained" color="primary">
      <Typography variant="button" fontWeight="bold">
        포크하기
      </Typography>
    </Button>
  );
};

export default ForkBtn;
