import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { useRouter } from "next/router";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const Footer = () => {
  const router = useRouter();
  return (
    <Box component="footer">
      <Fab
        variant="circular"
        size="medium"
        color="secondary"
        aria-label="back button"
        role="link"
        onClick={() => router.back()}>
        <ArrowBackIosNewRoundedIcon fontSize="small" />
      </Fab>
    </Box>
  );
};

export default Footer;
