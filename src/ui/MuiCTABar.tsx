import { useRouter } from "next/router";
import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import Fab from "@mui/material/Fab";
import { Stack } from "@mui/joy";

const MuiCTABar = () => {
  const router = useRouter();
  return (
    <Stack direction="row" justifyContent="center" gap={2} marginTop={4}>
      <Fab
        variant="extended"
        size="medium"
        color="secondary"
        onClick={() => router.push("/catalog/books")}>
        <ArrowBackIosNewRoundedIcon fontSize="small" sx={{ mr: 1 }} />
        Back
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        onClick={() => router.push(`${router.asPath}/update`)}>
        <EditNoteRoundedIcon fontSize="small" sx={{ mr: 1 }} />
        Edit
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="error"
        onClick={() => router.push("/catalog/books")}>
        <DeleteSweepRoundedIcon fontSize="small" sx={{ mr: 1 }} />
        Delete
      </Fab>
    </Stack>
  );
};

export default MuiCTABar;
