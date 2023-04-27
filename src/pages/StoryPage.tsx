import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { Story } from "../types/Story";
import { Comment } from "../types/Comment";
import axios from "axios";
import CommentComponent from '../components/CommentComponent'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { api } from "../helpers/const";


const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [storyResponse, commentsResponse] = await Promise.all([
        axios.get(`${api}/item/${id}.json`),
        axios.get(`${api}/item/${id}/kids.json`),
      ]);
      const storyData = storyResponse.data;
      const commentsData = await Promise.all(
        commentsResponse.data ? commentsResponse.data.map((commentId: number) => axios.get(`${api}/item/${commentId}.json`).then((response) => response.data)) : []
      );
      
      setStory(storyData);
      setComments(commentsData);
      setLoading(false);
    };

    fetchData();
  }, [id]);


  const handleRefresh = async () => {
    setLoading(true);

    const [storyResponse, commentsResponse] = await Promise.all([
      axios.get(`${api}/item/${id}.json`),
      axios.get(`${api}item/${id}/kids.json`),
    ]);
    const storyData = storyResponse.data;
    const commentsData = await Promise.all(
      commentsResponse.data.map((commentId: number) => axios.get(`${api}/item/${commentId}.json`).then((response) => response.data))
    );
    setStory(storyData);
    setComments(commentsData);

    setLoading(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    
     <>
     <Box
         display="flex"
         flexDirection="column"
         alignItems="center"
         my={2}
         style={{ maxWidth: "100%", margin: "0 auto" }}>
             <Navbar />
 
         <Box
             width="80%"
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="space-between"
             marginBottom="70px"
             marginTop="70px"
         >
             <Box display="flex" flexDirection="column" alignItems="center" my={2}>
                <Typography variant="h5" component="h1" mb={2}>
                    <a href={story?.url} target="_blank" rel="noopener noreferrer">
                    {story?.title}
                    </a>
                </Typography>
                <Typography variant="subtitle1" component="h2" mb={2}>
                    {`${story?.score} points | ${story?.by} | ${story?.time ? formatDistanceToNow(
                    new Date(story.time * 1000)) : ''} ago | ${comments.length} comments`}
                </Typography>
                <Button variant="outlined" onClick={handleRefresh} style={{ marginBottom: "2px" }}>
                    Refresh
                </Button>
                <List>
                    {comments.map((comment) => (
                    <CommentComponent key={comment.id} comment={comment} />
                    ))}
                </List>
                <Button variant="contained" component={Link} to="/" style={{ marginTop: "2rem" }}>
                    Back to News List
                </Button>
             </Box>
         </Box>
 
         <Footer />
         </Box>
         </>
  );
        }

    
    export default StoryPage;
