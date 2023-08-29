import React from 'react'
import BlogPost from './BlogPost'

export default function Blogs() {
  return (
    <>
    <h1 className="text-center" style={{margin:'75px 0px 20px'}}>Blogs</h1>
    
    <div className="container">
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />

    </div>

    </>
  )
}
