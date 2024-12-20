import React, { useState } from 'react';
import { Button, Box, Typography, SvgIcon } from '@mui/material';
import ShareDialog from './ShareDialog';

// Google Docs icon as an SVG
const GoogleDocsIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M16,18H8v-2h8V18z M16,14H8v-2h8V14z M13,9V3.5 L18.5,9H13z" fill="#4285F4"/>
  </SvgIcon>
);

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  return (
    <Box className="App" display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <GoogleDocsIcon style={{ fontSize: 60, marginBottom: '20px' }} />
      <Typography variant="h4" gutterBottom>
        Google Docs Share Access Enhancement Demo
      </Typography>
      <Box display="flex" justifyContent="center" width="100%" style={{ marginTop: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => setIsDialogOpen(true)}>
          Open Share Dialog
        </Button>
        <Box width="24px"></Box>
        <Button variant="outlined" color="primary" onClick={() => window.open('https://www.eddieziyuewang.com/translatex', '_blank')}>
          Go back to TransLateX
        </Button>
      </Box>
      <ShareDialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </Box>
  );
}

export default App;