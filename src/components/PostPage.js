import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import blogContext from "../context/blogContext";
import * as DOMPurify from "dompurify";

export default function PostPage() {
  const { loadBlog } = useContext(blogContext);
  const [clean, setclean] = useState(null);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    loadBlog(id)
      .then((data) => {
        setPost(data);
        cleanD(data.description);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const cleanD = (desc) => {
    let clean = DOMPurify.sanitize(desc, { USE_PROFILES: { html: true } });
    setclean(clean);
  };

  return (
    <div className="container">
      {post && (
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              Posted By <b>{post.author}</b> on
              <b> {new Date(post.date).toLocaleDateString()}</b>
            </p>
            <p className="card-text">
              <span className="text-muted">{post.tag}</span>
            </p>
          </div>
          <h2 className="card-header pb-4">{post.title}</h2>
          <div className="card-body">
            <p
              className="card-text"
              dangerouslySetInnerHTML={{ __html: clean }}
            ></p>
          </div>
        </div>
      )}
    </div>
  );
}
