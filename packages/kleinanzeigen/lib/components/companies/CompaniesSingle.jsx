import React from 'react';

import { Components, registerComponent } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

const CompaniesSingle = (props, context) => {
  return <Components.PostsPage documentId={props.params._id} />
};

CompaniesSingle.displayName = "CompaniesSingle";

registerComponent('CompaniesSingle', withGATracker(CompaniesSingle));
