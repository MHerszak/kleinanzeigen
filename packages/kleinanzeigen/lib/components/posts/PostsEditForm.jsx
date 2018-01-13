import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Components, registerComponent, getFragment, withMessages, withCurrentUser } from 'meteor/vulcan:core';

import { intlShape } from 'meteor/vulcan:i18n';

import { Posts } from '../../modules/posts/index.js';

import Users from "meteor/vulcan:users";

import { withRouter } from 'react-router'

const propTypes = {
  closeModal: PropTypes.func,
  flash: PropTypes.func,
  post: PropTypes.object.isRequired,
};

const contextTypes = {
  intl: intlShape
};

class PostsEditForm extends PureComponent {

  static propTypes = propTypes;

  static contextTypes = contextTypes;

  renderAdminArea() {
    return (
      <Components.ShowIf check={Posts.options.mutations.edit.check} document={this.props.post}>
        <div className="posts-edit-form-admin">
          <div className="posts-edit-form-id">ID: {this.props.post._id}</div>
          <Components.PostsStats post={this.props.post} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {
    console.log('thisprops.post => ', this.props.post);
    return (
      <div className="posts-edit-form">
        {Users.isAdmin(this.props.currentUser) ? this.renderAdminArea() : null}
        <Components.SmartForm
          collection={Posts}
          documentId={this.props.post._id}
          mutationFragment={getFragment('PostsPage')}
          successCallback={post => {
            this.props.closeModal();
            this.props.flash(this.context.intl.formatMessage({ id: 'posts.edit_success' }, { title: post.title }), 'success');
          }}
          removeSuccessCallback={({ documentId, documentTitle }) => {
            // post edit form is being included from a single post, redirect to index
            // note: this.props.params is in the worst case an empty obj (from react-router)
            if (this.props.params._id) {
              this.props.router.push('/');
            }

            const deleteDocumentSuccess = this.context.intl.formatMessage({ id: 'posts.delete_success' }, { title: documentTitle });
            this.props.flash(deleteDocumentSuccess, 'success');
            // todo: handle events in collection callbacks
            // this.context.events.track("post deleted", {_id: documentId});
          }}
          showRemove={true}
        />
      </div>
    );

  }
}

registerComponent('PostsEditForm', PostsEditForm, withMessages, withRouter, withCurrentUser);
