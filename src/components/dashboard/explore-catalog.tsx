import React from "react";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import Typography from "@mui/material/Typography";

const ExploreCatalog = () => {
  return (
    <Box padding={2} marginTop={4} display="flex" justifyContent="center">
      <Link
        href="/catalog/books"
        component={NextLink}
        role="link"
        tabIndex={0}
        title="Explore Library Catalog">
        <TravelExploreRoundedIcon
          sx={{
            verticalAlign: "middle",
            marginRight: 1,
            textDecorationThickness: "2px",
          }}
        />
        <Typography variant="subtitle1" component="span">
          Explore Library Catalog
        </Typography>
      </Link>
    </Box>
  );
};

export default ExploreCatalog;
