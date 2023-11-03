"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useCoverImage } from "../hooks/upload-image-cover";
import { Button } from "@nextui-org/react";

export default function AddNewPost() {
  const coverImage = useCoverImage();

  return (
    <SpeedDial
      onClick={coverImage.onOpen}
      ariaLabel="SpeedDial basic example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon />}
    ></SpeedDial>
  );
}
