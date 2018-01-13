import React from 'react';

import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';

import { Posts } from '../../modules/posts/index.js';

const PostsFeatured = ({ results, loading, currentUser }) => {

  const renderPostItems = (post) => (
    <Components.PostsItemFeatured
      post={post}
      currentUser={currentUser}
      className="posts-item-title"
    />
  );

  if (loading) {
    return <Components.Loading />
  } else if (!results || (results && results.length === 0)) {
    return null;
  } else {
    return (
      <div style={{ display: 'inline-flex' }}>
        {loading ? <Components.Loading/> : results.map(renderPostItems)}
      </div>
    )
  }
};


const options = {
  collection: Posts,
  queryName: 'postsFeaturedQuery',
  fragmentName: 'PostsList',
  terms: { view: 'featured' }
};

registerComponent('PostsFeatured', PostsFeatured, [withList, options], withCurrentUser);
