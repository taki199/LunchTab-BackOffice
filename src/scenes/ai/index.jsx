import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography, Container, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import AiwithText from '../../components/AiWithText';
import AiwithImage from '../../components/AiWithImage';

const Home = () => {
  const [aiWith, setAiWith] = useState('text');
  const theme = useTheme();

  const handleAiWith = (event, newValue) => {
    setAiWith(newValue);
  };

  return (
    <Container>
      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Generative AI LunchTab App!
        </Typography>
        <Typography variant="body1" gutterBottom>
         Get Help with our Google Gemini AI Find your keyWords or Get inspired!!
        </Typography>

        <Box sx={{ margin: '30px 0' }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Tabs
              value={aiWith}
              onChange={handleAiWith}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="AI with Text" value="text" />
              <Tab label="AI with Image" value="image" />
            </Tabs>
          </AppBar>
        </Box>

        <Box sx={{ mt: 3 }}>
          {aiWith === 'text' ? <AiwithText /> : <AiwithImage />}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
