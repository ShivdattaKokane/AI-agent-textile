import React from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const Reports: React.FC = () => {
  const { data } = useQuery({ queryKey: ['reports'], queryFn: async () => (await api.get('/reports')).data });
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Reports</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell>{r.title}</TableCell>
                <TableCell><Chip label={r.category} size="small" /></TableCell>
                <TableCell>{r.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Reports;
