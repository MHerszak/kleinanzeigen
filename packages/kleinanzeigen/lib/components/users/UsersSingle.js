import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const UsersSingle = (props, context) => (
  <Components.UsersProfile
    routes={props.routes}
    userId={props.params._id}
    slug={props.params.slug}
  />
);

UsersSingle.displayName = "UsersSingle";

registerComponent('UsersSingle', UsersSingle);
