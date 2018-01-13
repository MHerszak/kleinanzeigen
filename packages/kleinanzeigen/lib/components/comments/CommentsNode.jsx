import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const CommentsNode = ({ comment, currentUser }) => {
  const renderComment = (comment) => (
    <Components.CommentsNode currentUser={currentUser} comment={comment} key={comment._id} />
  );

  return <div className="comments-node post">
    <Components.CommentsItem currentUser={currentUser} comment={comment} key={comment._id} />
    {comment.childrenResults &&
      <div className="comments-children">
        {comment.childrenResults.map(renderComment)}
      </div>}
  </div>
};

CommentsNode.propTypes = {
  comment: PropTypes.object.isRequired, // the current comment
};

registerComponent('CommentsNode', CommentsNode);
