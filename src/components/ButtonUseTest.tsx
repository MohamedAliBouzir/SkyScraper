import React from 'react';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { Refresh as RefreshIcon, Cloud as CloudIcon } from '@mui/icons-material';
import { useTestServer } from '../hooks/useTestServer';

export const TestServerButton: React.FC = () => {
  const { data, isLoading, error, isError, refetch } = useTestServer();

  const handleTestServer = () => {
    refetch();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <CloudIcon /> Server Connection Test
        </Typography>

        <Button
          variant="contained"
          onClick={handleTestServer}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={16} /> : <RefreshIcon />}
          sx={{ mb: 2 }}
        >
          {isLoading ? 'Testing...' : 'Test Server Connection'}
        </Button>

        {data && !isLoading && (
          <Alert 
            severity={data.status ? 'success' : 'warning'} 
            sx={{ mb: 1 }}
          >
            <Typography variant="body2" fontWeight="bold">
              Status: {data.status ? 'ONLINE' : 'OFFLINE'}
            </Typography>
            <Typography variant="body2">
              Message: {data.message}
            </Typography>
          </Alert>
        )}

        {isError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Connection Failed
            </Typography>
            <Typography variant="body2">
              Error: {error?.message || 'Unknown error'}
            </Typography>
          </Alert>
        )}

        {/* Instructions */}
        <Typography variant="caption" color="text.secondary">
          Click to test connection to Sky-Scrapper API
        </Typography>
      </Box>
    </Paper>
  );
};

export default TestServerButton;