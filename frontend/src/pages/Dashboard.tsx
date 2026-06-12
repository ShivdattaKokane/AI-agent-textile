import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid2 as Grid, Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import api from '../services/api';
import { DashboardData } from '../types';

const Dashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => (await api.get('/dashboard')).data,
    retry: 1
  });

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (isError) return <Alert severity="error">Failed to load dashboard data. Please ensure SAP connectivity is configured.</Alert>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Enterprise Dashboard (SAP Integrated)</Typography>
      <Grid container spacing={3}>
        {data?.kpis.map((kpi, i) => (
          <Grid size={{ xs: 12, sm: 3 }} key={i}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">{kpi.title}</Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>{kpi.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Additional Dashboard sections can be added here */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>System Status</Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">Connected to SAP S/4HANA OData Services.</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
