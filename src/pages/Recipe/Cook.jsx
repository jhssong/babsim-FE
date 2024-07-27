import React from 'react';
import { Box, Typography } from '@mui/material';
import { AppBarWithTitle } from '../../components/AppBar';

const Cook = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100vh',
      }}>
      <AppBarWithTitle title="Cook" rightIcon="list" />
      <Typography variant="h6" color="primary">
        cook
      </Typography>
    </Box>
  );
};

export default Cook;
