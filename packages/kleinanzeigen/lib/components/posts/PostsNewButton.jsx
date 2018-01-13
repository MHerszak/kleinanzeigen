import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

const PostsNewButton = (props, context) => {
  const size = props.currentUser ? 'large' : 'small';
  const color = props.color;
  const button = (
    <Button color={color}>
      <Components.Icon name="new" />
      {/*<FormattedMessage id="posts.new_post" />*/}
    </Button>
  );

  return (
    <Components.ModalTrigger size={size} title={context.intl.formatMessage({ id: 'posts.new_post' })} component={button}>
      <Components.PostsNewForm />
    </Components.ModalTrigger>
  );
};

PostsNewButton.displayName = 'PostsNewButton';

PostsNewButton.propTypes = {
  currentUser: PropTypes.object,
};

PostsNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('PostsNewButton', PostsNewButton, withCurrentUser);

// const PostsNew = (props, context) => {
//   const size = props.currentUser ? 'large' : 'small';
//   return (
//     <Components.ModalTrigger
//       size={size}
//       title={context.intl.formatMessage({ id: 'posts.new_post' })}
//       component={<FormattedMessage id="posts.new_post" />}
//     >
//       <Components.PostsNewForm />
//     </Components.ModalTrigger>
//   );
// };
//
// PostsNew.displayName = 'PostsNew';
//
// PostsNew.propTypes = {
//   currentUser: PropTypes.object,
// };
//
// PostsNew.contextTypes = {
//   messages: PropTypes.object,
//   intl: intlShape
// };
//
// registerComponent('PostsNew', PostsNew, withCurrentUser);