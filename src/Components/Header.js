import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
        sx={{
          backgroundColor: '#6E6E6E'
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1 , color: '#BAFF39'}}>
          Operation Research
          </Typography>
          <Typography variant="h6" component="div" sx={{ color: '#BAFF39'}}>
          Miss Shaista Raees
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}