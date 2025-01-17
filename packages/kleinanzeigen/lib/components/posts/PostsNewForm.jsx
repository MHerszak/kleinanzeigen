import React from 'react';

import PropTypes from 'prop-types';

import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';

import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';

import { Posts } from '../../modules';

import { withRouter } from 'react-router'

const PostsNewForm = (props, context) => (
  <Components.ShowIf
    check={Posts.options.mutations.new.check}
    failureComponent={<div>
      <p className="posts-new-form-message">
        <FormattedMessage id="posts.sign_up_or_log_in_first" /></p>
        <Components.AccountsLoginForm />
      </div>}
  >
    <div className="posts-new-form">
      <Components.SmartForm
        collection={Posts}
        mutationFragment={getFragment('PostsPage')}
        successCallback={post => {
          props.closeModal();
          props.router.push({pathname: props.redirect || Posts.getPageUrl(post)});
          props.flash(context.intl.formatMessage({ id: 'posts.created_message' }), 'success');
        }}
      />
    </div>
  </Components.ShowIf>
);

PostsNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
};

PostsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};

PostsNewForm.displayName = 'PostsNewForm';

registerComponent('PostsNewForm', PostsNewForm, withRouter, withMessages);
