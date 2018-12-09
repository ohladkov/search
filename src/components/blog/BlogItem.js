import React from 'react';
import * as Markdown from 'react-markdown'

const BlogItem = (props) => {
  return (
    <div className="post">
      <h1>{props.post1}</h1>
      <div className="description">
        <Markdown source={props.content1} />
      </div>
    </div>
  )
}

export default BlogItem;
