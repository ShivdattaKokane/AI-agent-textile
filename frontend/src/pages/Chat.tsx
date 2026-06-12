import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Paper, TextField, IconButton, Typography, Avatar, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,
  Fade, Skeleton, Chip
} from '@mui/material';
import { Send, SmartToy, Person } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, LineChart, Line
} from 'recharts';
import api from '../services/api';
import { ChatMessage } from '../types';
import { useAuth } from '../context/AuthContext';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (val?: string) => {
    const text = val || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      content_type: 'text',
      timestamp: new Date().toISOString(),
      conversation_id: ''
    };

    setMessages(prev => [...prev, userMsg]);
    if (!val) setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/chat', { message: text });
      setMessages(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (msg: ChatMessage) => {
    if (msg.role === 'user') return <Typography>{msg.content}</Typography>;

    if (msg.content_type === 'text') {
      return <ReactMarkdown>{msg.content}</ReactMarkdown>;
    }

    if (msg.content_type === 'table' && Array.isArray(msg.data)) {
      const cols = Object.keys(msg.data[0] || {});
      return (
        <Box sx={{ mt: 2 }}>
          <ReactMarkdown>{msg.content}</ReactMarkdown>
          <TableContainer component={Paper} variant="outlined" sx={{ mt: 1, maxHeight: 300 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {cols.map(c => <TableCell key={c}><strong>{c}</strong></TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {msg.data.map((row: any, i: number) => (
                  <TableRow key={i}>
                    {cols.map(c => <TableCell key={c}>{row[c]}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    }

    if (msg.content_type === 'chart' && Array.isArray(msg.data)) {
      const dataKeys = Object.keys(msg.data[0]).filter(k => k !== 'Month' && k !== 'name' && k !== 'Material');
      return (
        <Box sx={{ mt: 2 }}>
          <ReactMarkdown>{msg.content}</ReactMarkdown>
          <Box sx={{ height: 250, mt: 2, width: '100%', minWidth: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={msg.data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey={Object.keys(msg.data[0])[0]} />
                <YAxis />
                <RechartsTooltip />
                {dataKeys.map((k, i) => (
                  <Bar key={k} dataKey={k} fill={i === 0 ? '#0070d2' : '#5cbae6'} radius={[4, 4, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      );
    }

    return <Typography>{msg.content}</Typography>;
  };

  const suggestions = [
    "Show me sales trend",
    "Check inventory stock status",
    "List all production orders",
    "What are our main KPIs?"
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, pr: 2 }}>
        {messages.length === 0 && (
          <Fade in timeout={1000}>
            <Box sx={{ textAlign: 'center', mt: 8 }}>
              <SmartToy sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4">Welcome, {user?.full_name}</Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>How can I help you with your SAP business data today?</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap', maxWidth: 600, mx: 'auto' }}>
                {suggestions.map(s => (
                  <Button
                    key={s}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 4, textTransform: 'none' }}
                    onClick={() => handleSend(s)}
                  >
                    {s}
                  </Button>
                ))}
              </Box>
            </Box>
          </Fade>
        )}

        {messages.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: 2, mb: 4 }}>
            <Avatar sx={{
              bgcolor: msg.role === 'user' ? 'primary.main' : 'secondary.main',
              width: 36, height: 36,
              boxShadow: 1
            }}>
              {msg.role === 'user' ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
            </Avatar>
            <Paper elevation={0} sx={{
              p: 2.5,
              maxWidth: '85%',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: msg.role === 'user' ? 'primary.main' : 'background.paper',
              color: msg.role === 'user' ? 'white' : 'text.primary',
              boxShadow: msg.role === 'user' ? '0 4px 12px rgba(0,112,210,0.2)' : 'none'
            }}>
              {renderContent(msg)}
            </Paper>
          </Box>
        ))}

        {isLoading && (
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}><SmartToy fontSize="small" /></Avatar>
            <Box sx={{ width: '50%' }}>
              <Skeleton variant="text" sx={{ fontSize: '1.2rem', width: '80%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
              <Skeleton variant="rectangular" height={60} sx={{ mt: 1, borderRadius: 2 }} />
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        component="form"
        onSubmit={e => { e.preventDefault(); handleSend(); }}
        sx={{
          p: 1.5,
          bgcolor: 'background.paper',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.03)'
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask a business question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          variant="standard"
          slotProps={{ input: { disableUnderline: true } }}
          sx={{ px: 2 }}
        />
        <IconButton
          color="primary"
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          sx={{ bgcolor: input.trim() ? 'primary.main' : 'transparent', color: input.trim() ? 'white' : 'inherit', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          <Send />
        </IconButton>
      </Box>
      <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
        Enterprise AI Assistant can make mistakes. Check important info.
      </Typography>
    </Box>
  );
};

export default Chat;
