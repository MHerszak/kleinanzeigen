import React from 'react';

import { registerComponent, withList } from 'meteor/vulcan:core';

import Users from 'meteor/vulcan:users';

import { Posts } from '../../modules/posts/index.js';



import { Link } from 'react-router';

const AdminUsersPosts = ({ document: user }) => (
  <ul>
    {user.posts && user.posts.map(post =>
      <li key={post._id}><Link to={Posts.getLink(post)}>{post.title}</Link></li>
    )}
  </ul>
);

const options = {
  collection: Users,
  fragmentName: 'UsersAdmin',
};

registerComponent('AdminUsersPosts', AdminUsersPosts, [withList, options]);

export default AdminUsersPosts;
