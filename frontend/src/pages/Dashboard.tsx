import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid2 as Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import api from '../services/api';
import { DashboardData } from '../types';

const Dashboard: React.FC = () => {
  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => (await api.get('/dashboard')).data
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Dashboard</Typography>
      <Grid container spacing={3}>
        {data?.kpis.map((kpi, i) => (
          <Grid size={{ xs: 12, sm: 3 }} key={i}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2">{kpi.title}</Typography>
              <Typography variant="h4">{kpi.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
