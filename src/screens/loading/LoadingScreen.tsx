import React from "react";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
function LoadingScreen() {
  return (
    <div className="bg-main-background-color flex items-center justify-center w-screen h-screen">
      <div className="text-border-gray w-fit animate-spin text-8xl flex items-center justify-center">
        <RefreshTwoToneIcon fontSize="inherit" />
      </div>
    </div>
  );
}
export default LoadingScreen;
