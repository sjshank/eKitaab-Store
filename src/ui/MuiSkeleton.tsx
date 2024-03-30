import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function MuiSkeleton() {
  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <Skeleton animation="wave" sx={{ margin: 3, padding: 2 }} />
      <Skeleton animation="wave" sx={{ margin: 3, padding: 2 }} />
      <Skeleton animation="wave" sx={{ margin: 3, padding: 2 }} />
      <Skeleton animation="wave" sx={{ margin: 3, padding: 2 }} />
      <Skeleton animation="wave" sx={{ margin: 3, padding: 2 }} />
    </Box>
  );
}
