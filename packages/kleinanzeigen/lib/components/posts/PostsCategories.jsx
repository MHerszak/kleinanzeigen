import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const PostsCategories = ({post}) => {
  const categorieList = category => (
    <Link className="posts-category" key={category._id} to={{pathname: "/", query: {cat: category.slug}}}>{category.name}</Link>
  );

  return (
    <div className="posts-categories">
      {post.categories.map(categorieList)}
    </div>
  )
};

PostsCategories.displayName = "PostsCategories";

registerComponent('PostsCategories', PostsCategories);