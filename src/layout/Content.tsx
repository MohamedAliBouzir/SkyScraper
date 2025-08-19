import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import contents from "../routes/contentRoutes";
import LoadingScreen from "./LoadingScreen";
import Page404 from "../pages/Page404";

const Content = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {contents.map((page) => (
          <Route key={page.path} {...page} />
        ))}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};
export default Content;
