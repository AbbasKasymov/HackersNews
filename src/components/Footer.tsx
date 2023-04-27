
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import { Link } from "react-router-dom";
// import { Story } from "../types/Story";
// import {api} from '../helpers/const'

// const Footer = () => {
   
  
//     return (
//     <>
    
//     <Box
//   display="flex"
//   flexDirection="column"
//   alignItems="center"
//   my={2}
//   style={{ maxWidth: "100%", margin: "0 auto" }}
// >
  

  
//   <Box width="100%" height="50px" position="fixed" bottom="0"  style={{ background: "linear-gradient(to right, #ff8a00, #da1b60)", zIndex: 1, }}></Box>
// </Box>


      
//     </>
    
//     );
//   };
  
//   export default Footer;

import React from "react";
import { Box } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      width="100%"
      height="50px"
      position="fixed"
      bottom="0"
      style={{
        background: "linear-gradient(to right, #ff8a00, #da1b60)",
        zIndex: 1,
      }}
    ></Box>
  );
};

export default Footer;
