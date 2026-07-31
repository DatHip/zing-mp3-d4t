import React from "react";
import { Outlet } from "react-router-dom/dist";
import LoadingInit from "./LoadingInit";

const Loading = () => {
  return (
    <>
      <React.Suspense fallback={<LoadingInit></LoadingInit>}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default Loading;
