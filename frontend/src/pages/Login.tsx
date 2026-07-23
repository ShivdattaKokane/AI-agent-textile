import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, Paper, Container, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { username: '', password: '' } });

  const onSubmit = async (data: any) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await api.post('/login', { username: data.username, password: data.password });
      await login(res.data.access_token);
      navigate('/');
    } catch (e: any) {
      const message = e.response?.data?.detail || 'Login failed. Please check your credentials and SAP connectivity.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Enterprise AI Assistant</Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Login with Enterprise Credentials</Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            fullWidth
            label="Username"
            {...register('username')}
            sx={{ mb: 2 }}
            disabled={isSubmitting}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            sx={{ mb: 2 }}
            disabled={isSubmitting}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            sx={{ height: 48 }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
