import React from 'react';

import { isMobile } from 'react-device-detect';

import { Components, registerComponent, withList, withCurrentUser } from 'meteor/vulcan:core';

import { Posts } from '../../modules/posts/index.js';

const PostsFeatured = ({ results, loading, currentUser }) => {

  const renderPostItems = (post) => (
    <Components.PostsItemFeatured
      key={post._id}
      post={post}
      currentUser={currentUser}
      className="posts-item-title"
    />
  );

  const renderResultList = () => {
    if (!isMobile) {
      return results.map(renderPostItems);
    }
    return renderPostItems(results[0]);
  }

  if (loading) {
    return <Components.Loading />
  } else if (!results || (results && results.length === 0)) {
    return null;
  } else {
    return (
      <div style={{ display: 'inline-flex' }}>
        {loading ? <Components.Loading /> : renderResultList()}
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
