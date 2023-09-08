import React, { useEffect, useContext } from "react";
import BlogPost from "./BlogPost";
import BlogContext from "../context/blogContext";

export default function Blogs(props) {
  const { blogs, getBlogs } = useContext(BlogContext);

  useEffect(() => {
    getBlogs();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="text-center" style={{ margin: "75px 0px 20px" }}>
        Blogs
      </h1>

      <div className="container">
        <div className="row">
          {blogs.map((blog) => {
            return (
              <BlogPost key={blog.id} blog={blog} showAlert={props.showAlert} />
            );
          })}
        </div>
      </div>
    </>
  );
}
