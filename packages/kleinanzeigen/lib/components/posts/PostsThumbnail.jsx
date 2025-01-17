import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Posts } from '../../modules/posts/index.js';

const PostsThumbnail = ({ post, onError }) => (
  <a className="posts-thumbnail" href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
    <span><img src={Posts.getThumbnailUrl(post)} onError={onError} /></span>
  </a>
);

PostsThumbnail.displayName = "PostsThumbnail";

// registerComponent('PostsThumbnail', PostsThumbnail);