import React from 'react';
import './App.css';
import {Button, Grid} from "@mui/material";
import AppWelcome from "./components/AppWelcome";
import ThemeProvider from './theme';

function App() {
  return (
   <ThemeProvider>
       <div className="App">
           <Grid item xs={12} md={8}>
               <AppWelcome
                   title={`Welcome back! \n Yawfeeq`}
                   description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
                   img={""}
                   action={<Button variant="contained">Go Now</Button>}
               />
           </Grid>

       </div>
   </ThemeProvider>
  );
}

export default App;
