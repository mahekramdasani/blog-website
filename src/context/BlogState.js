import React, { useState } from "react";
import BlogContext from "./blogContext";


const BlogState = (props) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const url = "http://127.0.0.1:8000/api/blogs/fetchallblogs";
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    setBlogs(data);
  };

  const addBlog = async (title, description, tag, author) => {
    try {
      const url = "http://127.0.0.1:8000/api/blogs/addblog";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, tag, author }),
      });
      const data = await response.json();
      // console.log(data.non_field_errors);
      if (!data.non_field_errors) {
        props.showAlert("Post Added Successfully", "success");
        return true;
      } else {
        props.showAlert("Blog already exists with this title", "danger");
        return false;
      }
    } catch (error) {
      props.showAlert("Post Not Added", "danger");
      return false;
    }
  };

  // Load single blog of given id
  const loadBlog = async (id) => {
    const url = `http://127.0.0.1:8000/api/blogs/${id}/`;
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    // console.log(response.text())
    return data;
  };

  return (
    <BlogContext.Provider value={{ blogs, getBlogs, addBlog ,loadBlog}}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogState;
