import React from "react";
import { Link } from "react-router-dom";
import { convert } from "html-to-text";

export default function BlogPost(props) {
  let { title, description, tag, author, date, id, image } = props.blog;
  const imageUrl = "http://127.0.0.1:8000/" + image;
  const options = {
    wordwrap: false,
    // ...
  };
  description = convert(description, options);

  return (
    <>
      <div className="container">
        <div className="card my-2">
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text" style={{ hyphens: "auto" }}>
              {description.slice(0, 180)}...
            </p>

            <p className="card-text">
              <small className="text-body-secondary">
                By {author} on {date}
              </small>
            </p>
            <span
              className="position-absolute translate-middle badge rounded-pill text-bg-info"
              style={{ left: "90%", zIndex: "1" }}
            >
              {tag}
            </span>
            <Link to={`/posts/${id}`} className="btn btn-primary">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
