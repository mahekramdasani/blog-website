import React from 'react'

export default function NewsItem(props) {
    let { title, description, imageUrl, newsUrl, author, date, source } = props
    return (

        <div>
            <div className="card my-2">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-info" style={{ left: "95%", zIndex: "1" }}>{source}</span>
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text" style={{ hyphens: "auto" }}>{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {author} on {date}</small></p>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read more</a>
                </div>
            </div>
        </div>

    )
}