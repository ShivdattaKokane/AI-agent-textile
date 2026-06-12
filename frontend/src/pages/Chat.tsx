import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Avatar, List, ListItem, CircularProgress } from '@mui/material';
import { Send, SmartToy } from '@mui/icons-material';
import api from '../services/api';
import { ChatMessage } from '../types';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: any = { role: 'user', content: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/chat', { message: input });
      setMessages(prev => [...prev, res.data]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((m, i) => (
          <Box key={i} sx={{ mb: 2, textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <Paper sx={{ p: 2, display: 'inline-block', maxWidth: '70%', bgcolor: m.role === 'user' ? 'primary.main' : 'background.paper', color: m.role === 'user' ? 'white' : 'text.primary' }}>
              <Typography>{m.content}</Typography>
            </Paper>
          </Box>
        ))}
        {loading && <CircularProgress size={20} />}
      </Box>
      <Box sx={{ p: 2, display: 'flex' }}>
        <TextField fullWidth value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} />
        <IconButton onClick={handleSend} color="primary"><Send /></IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
