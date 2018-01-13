import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Comments } from '../../modules/comments/index.js';

const CommentsEditForm = (props, context) => {
  return (
    <div className={`comments-edit-form ${props.className}`}>
      <Components.SmartForm 
        layout="elementOnly"
        collection={Comments}
        documentId={props.comment._id}
        successCallback={props.successCallback}
        cancelCallback={props.cancelCallback}
        removeSuccessCallback={props.removeSuccessCallback}
        showRemove={true}
        mutationFragment={getFragment('CommentsList')}
      />
    </div>
  )
}

CommentsEditForm.propTypes = {
  className: PropTypes.string, //
  comment: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  cancelCallback: PropTypes.func
};

registerComponent('CommentsEditForm', CommentsEditForm, withMessages);
