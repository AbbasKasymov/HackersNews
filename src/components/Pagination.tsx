import React from "react";
import { Box, Button } from "@mui/material";
import { Story } from "../types/Story";

interface PaginationProps {
  visibleStories: Story[];
  stories: Story[];
  handleMore: () => void;
  handleLess: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  visibleStories,
  stories,
  handleMore,
  handleLess,
}) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {visibleStories.length <= 10 ? (
        <></>
      ) : (
        <Button
          variant="contained"
          onClick={handleLess}
          style={{ marginRight: "5px" }}
        >
          Less
        </Button>
      )}
      {visibleStories.length >= stories.length ? (
        <></>
      ) : (
        <Button variant="contained" onClick={handleMore}>
          More
        </Button>
      )}
    </Box>
  );
};

export default Pagination;
