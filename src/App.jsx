import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PostPage from "./pages/post/PostPage.jsx";
import PostList from "../src/components/posts/PostList.jsx"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Bienvenido a tu Blog personal</div>} />
        <Route path="/post" element={<PostList />} />
        <Route path="/post/:postId" element={<PostPage />} />    

      </Route>
    </Routes>
  );
}
