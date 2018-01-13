import React from 'react';

import { Components, registerComponent } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

const PostsSingle = (props, context) => {
  return <Components.PostsPage documentId={props.params._id} />
};

PostsSingle.displayName = "PostsSingle";

registerComponent('PostsSingle', withGATracker(PostsSingle));
