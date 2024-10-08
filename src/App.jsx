import Todolist from './components/Todolist';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <CssBaseline />  
      <Container maxWidth="lg">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h4'>
              My Todos Application
            </Typography>
          </Toolbar>
        </AppBar>

        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="HOME" value="1" />
              <Tab label="TODOS" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Typography variant="h1">Welcome Asmirrr</Typography>
          </TabPanel>

          <TabPanel value="2">
            <Todolist />
          </TabPanel>

        </TabContext>
      </Container>
    </Box>
  );
}

export default App