
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

// const Navbar = () => {
//     const [loading, setLoading] = useState(true);
//     const [stories, setStories] = useState<Story[]>([]);
//     const [visibleStories, setVisibleStories] = useState<Story[]>([]);
//     const [pageSize, setPageSize] = useState(10);
  
//     useEffect(() => {
//       fetchStories();
//       const interval = setInterval(() => {
//         fetchStories();
//       }, 60000);
  
//       return () => clearInterval(interval);
//     }, []);
  
//     useEffect(() => {
//       setVisibleStories(stories.slice(0, pageSize));
//     }, [stories, pageSize]);
  
//     const fetchStories = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get<number[]>(
//          `${api}/newstories.json`
//         );
//         const storyIds = response.data;
//         const stories = await Promise.all(
//           storyIds.slice(0, 100).map(async (id: number) => {
//             const storyResponse = await axios.get<any>(
//               `${api}/item/${id}.json`
//             );
//             const story = storyResponse.data;
//             return {
//               id: story.id,
//               title: story.title,
//               author: story.by,
//               date: story.time,
//               comments: story.descendants,
//               rating: story.score,
//             } as Story;
//           })
//         );
//         setStories(stories);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     const handleRefresh = () => {
//       setLoading(true);
//       fetchStories().finally(() => setLoading(false));
//     };
  
   
  
//     return (
//     <>
    
//     <Box
//   display="flex"
//   flexDirection="column"
//   alignItems="center"
//   my={2}
//   style={{ maxWidth: "100%", margin: "0 auto" }}
// >
//   <Box
//     width="100%"
//     height="50px"
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     position="fixed"
//     top="0"
//     style={{
//       background: "linear-gradient(to right, #ff8a00, #da1b60)",
//       marginBottom: "10px", zIndex: 1,
//     }}
//   >
//     <Box width="80%" height="50px" display="flex" alignItems="center" justifyContent="space-between">
//       <Typography variant="h5" component="h1" style={{ color: "#fff" }}>
//         HackersNews
//       </Typography>
//       <Button variant="contained" color="success" onClick={handleRefresh} style={{ marginBottom: "2px" }}>
//         Refresh
//       </Button>
//     </Box>
//   </Box>
// </Box>
      
//     </>
    
//     );
//   };
  
//   export default Navbar;

import React from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { api } from "../helpers/const";
import { Link } from "react-router-dom";

interface NavbarProps {
  handleRefresh: () => void;
}

const Navbar = () => {
  return (
    <Box
      width="100%"
      height="50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="fixed"
      top="0"
      style={{
        background: "linear-gradient(to right, #ff8a00, #da1b60)",
        marginBottom: "10px",
        zIndex: 1,
      }}
    >
      <Box
        width="80%"
        height="50px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5" component="h1" style={{ color: "#fff" }}>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                HackersNews
            </Link>
        </Typography>
        
      </Box>
    </Box>
  );
};

export default Navbar;
