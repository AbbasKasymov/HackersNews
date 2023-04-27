import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Comment as CommentType } from "../types/Comment";
import axios from "axios";

type CommentProps = {
  comment: CommentType;
};

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [childComments, setChildComments] = useState<CommentType[]>([]);

  const { id, by, time, text, kids } = comment;

  const handleExpand = async () => {
    setIsLoading(true);
    if (kids && kids.length) {
      const childCommentsResponse = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${kids.join(',')}.json`
      );

      const childCommentsData = await Promise.all(
        kids.map((childCommentId: number) =>
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${childCommentId}.json`)
            .then((response) => response.data)
        )
      );
      setChildComments(childCommentsData);
    }
    setIsLoading(false);
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={by}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {` ${formatDistanceToNow(new Date(time * 1000))} ago`}
              </Typography>
              <br />
              {text}
            </>
          }
        />
      </ListItem>
      {kids && kids.length && (
        <Button onClick={isExpanded ? handleCollapse : handleExpand} disabled={isLoading}>
          {isExpanded ? "Collapse" : "Expand"} ({kids.length})
        </Button>
      )}
      {isExpanded && (
        <List sx={{ ml: 3 }}>
          {childComments.map((childComment) => (
            <CommentComponent key={childComment.id} comment={childComment} />
          ))}
        </List>
      )}
    </>
  );
};


export default CommentComponent;
