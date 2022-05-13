import React from "react";
import MediaCard from "./Card";
import Typography from "@mui/material/Typography";
import "../styles.css";

function DrawerContent() {
  return (
    <div className="drawer-content">
      <Typography sx={{ p: 2, color: "text.secondary" }}>51 results</Typography>
      <MediaCard />
      <MediaCard />
      <MediaCard />
      <MediaCard />
    </div>
  );
}

export default DrawerContent;
