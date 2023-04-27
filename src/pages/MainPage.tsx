import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";
import { Story } from "../types/Story";
import { api } from "../helpers/const";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState<Story[]>([]);
  const [visibleStories, setVisibleStories] = useState<Story[]>([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchStories();
    const interval = setInterval(() => {
      fetchStories();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setVisibleStories(stories.slice(0, pageSize));
  }, [stories, pageSize]);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const response = await axios.get<number[]>(`${api}/newstories.json`);
      const storyIds = response.data;
      const stories = await Promise.all(
        storyIds.slice(0, 100).map(async (id: number) => {
          const storyResponse = await axios.get<any>(
            `${api}/item/${id}.json`
          );
          const story = storyResponse.data;
          return {
            id: story.id,
            title: story.title,
            author: story.by,
            date: story.time,
            comments: story.descendants,
            rating: story.score,
          } as Story;
        })
      );
      setStories(stories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchStories().finally(() => setLoading(false));
  };

  const handleMore = () => {
    setPageSize((prev) => prev + 10);
  };

  const handleLess = () => {
    setPageSize((prev) => prev - 10);
  };

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
            {loading ? (
            <CircularProgress />
            ) : (
            <>
                <Typography variant="h4" component="h1">
                Latest News
                </Typography>
                <Button
          variant="contained"
          color="success"
          onClick={handleRefresh}
          style={{ marginBottom: "2px" }}
        >
          Refresh
        </Button>

                <List style={{ width: "100%" }}>
                {visibleStories.map((story, index) => (
                    <ListItem
                    key={story.id}
                    button
                    component={Link}
                    to={`/stories/${story.id}`}
                    >
                    <ListItemText
                        primary={`${index + 1}. ${story.title}`}
                        secondary={`${story.author} - ${formatDistanceToNow(
                        new Date(story.date * 1000)
                        )} ago - ${story.comments} comments - ${story.rating} points`}
                    />
                    </ListItem>
                ))}
                </List>

                <Pagination
                visibleStories={visibleStories}
                stories={stories}
                handleLess={handleLess}
                handleMore={handleMore}
                />
            </>
            )}
        </Box>

        <Footer />
        </Box>
        </>
  );
};

export default MainPage;

