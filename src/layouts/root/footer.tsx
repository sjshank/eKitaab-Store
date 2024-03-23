import React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <Stack
      component="footer"
      marginTop={2}
      marginBottom={4}
      justifyContent="center"
      alignItems="center">
      <Divider flexItem variant="middle" />
      <Typography variant="subtitle2" component="div" padding={2}>
        Copyright @2024
        <FavoriteIcon
          fontSize="small"
          sx={{ color: "#FF0000", margin: "0 4px" }}
        />
        <Link
          component="a"
          href="https://github.com/sjshank"
          target="_blank"
          tabIndex={0}
          sx={{ cursor: "pointer", fontWeight: 600 }}>
          SJSHANK
        </Link>
      </Typography>
    </Stack>
  );
};

export default Footer;
