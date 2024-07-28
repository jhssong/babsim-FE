import React from 'react';
import { Box, Typography } from '@mui/material';
import { AppBarWithTitle } from '../../components/AppBar';
import { VCard } from '../../components/Card';

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
      <VCard />
    </Box>
  );
};

export default Cook;
