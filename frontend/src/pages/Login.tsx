import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: { email: 'admin@example.com', password: 'admin123' } });

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post('/login', data);
      await login(res.data.access_token);
      navigate('/');
    } catch (e) {
      alert('Login failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Email" {...register('email')} sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" type="password" {...register('password')} sx={{ mb: 2 }} />
          <Button fullWidth variant="contained" type="submit">Login</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
