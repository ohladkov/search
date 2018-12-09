import React, { Component } from 'react';
import * as contentful from 'contentful'
import BlogItem from './BlogItem';
import './blog.css';

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosts: [],
      filteredPosts: [],
      searchQuery: '',
    };

    this.filterPosts = this.filterPosts.bind(this);
  }

  client = contentful.createClient({
    space: process.env.REACT_APP_SPACE_ID,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
  });

  fetchPosts = () => this.client.getEntries();

  setPosts = response => {
    this.setState({
      initialPosts: response.items
    })
  }

  componentDidMount() {
    this.fetchPosts().then(this.setPosts);
  }

  filterPosts(e) {
    const initialPosts = this.state.initialPosts.slice();

    const filteredPosts = initialPosts.filter(({fields}) => {
      return fields.post1.toLowerCase().includes(e.target.value.toLowerCase());
    });

    this.setState({
      filteredPosts: filteredPosts,
      searchQuery: e.target.value.toLowerCase()
    });
  }

  render() {
    let posts = [];

    if (this.state.searchQuery === '') {
      posts = this.state.initialPosts;
    } else {
      posts = this.state.filteredPosts;
    }

    return (
      <div className="blog">

        <div className="blog-search">
          <form action="#">
            <label htmlFor="search">Search post:</label>
            <input type="text" placeholder="Enter a post title" name="search" id="search" onChange={this.filterPosts} autoComplete="off" />
          </form>
        </div>

        <div className="posts-wrapper">
          {posts.map(({fields}, i) =>
            <BlogItem key={i} {...fields} />
          )}
        </div>

      </div>
    );
  }
}

export default Blog;
