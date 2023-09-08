import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlogContext from "../context/blogContext";

export default function AddPost(props) {
  const { addBlog } = useContext(BlogContext);

  const [selectedImage, setSelectedImage] = useState(null);

  const [value, setValue] = useState("");
  let toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    // ['link', 'image'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  const [post, setPost] = useState({
    title: "",
    description: "",
    tag: "",
    author: "",
  });

  const onChange = (e) => {
    
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      description: value,
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  }

  const resetPost = (e) => {
    // e.preventDefault();
    setPost({
      title: "",
      description: "",
      tag: "",
      author: "",
    });
    setValue("");
    props.showAlert("Post Content Reset Successfully", "success");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(selectedImage === null){
      setSelectedImage("images/default.jpg")
    }
    const result = await addBlog(
      post.title,
      post.description,
      post.tag,
      post.author,
      selectedImage
    );
    if (result) {
      setPost({
        title: "",
        description: "",
        tag: "",
        author: "",
      });
      setValue("");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">
        Unleash Your Inner Geek - Tech Blogging Time
      </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            className="form-control border border-dark"
            id="postTitle"
            placeholder="Enter Post Title Here"
            name="title"
            onChange={onChange}
            value={post.title}
          />
        </div>
        <div className="mb-3">
        <label htmlFor="image" className="form-label me-2">
            Upload Image 
          </label>
        <input type="file" accept="image/*" onChange={handleImageChange} id="image" name="image"/>
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">
            Post Content
          </label>
          {/* <textarea
            className="form-control border border-dark"
            id="postContent"
            rows="15"
            placeholder="Enter Post Content Here"
            name="content"
            onChange={onChange}
            value={post.content}
          ></textarea> */}

          <ReactQuill
            modules={module}
            theme="snow"
            value={value}
            onChange={setValue}
            className="border border-dark"
          />
          {/* {console.log(ReactQuill.getText())} */}
        </div>
        <div className="mb-3">
          <label htmlFor="postCategory" className="form-label">
            Post Category
          </label>
          <input
            type="text"
            className="form-control border border-dark"
            id="postCategory"
            placeholder="Enter Post Category Here"
            name="tag"
            onChange={onChange}
            value={post.tag}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control border border-dark"
            id="author"
            placeholder="Enter Author Name Here"
            name="author"
            onChange={onChange}
            value={post.author}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary mx-2"
            onClick={handleClick}
            disabled={
              post.title === "" ||
              post.tag === "" ||
              post.description === "" ||
              value === ""
            }
          >
            Create Post
          </button>
          <button
            className="btn btn-danger"
            onClick={resetPost}
            disabled={
              post.title === "" &&
              post.tag === "" &&
              post.description === "" &&
              value === ""
            }
          >
            Reset Content
          </button>
        </div>
      </form>
    </div>
  );
}
