import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Components, registerComponent, getFragment, withMessages, withCurrentUser } from 'meteor/vulcan:core';

import { intlShape } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index.js';

import Users from "meteor/vulcan:users";

import { withRouter } from 'react-router'

const propTypes = {
  closeModal: PropTypes.func,
  flash: PropTypes.func,
  document: PropTypes.object.isRequired,
};

const contextTypes = {
  intl: intlShape
};

class CompaniesEditForm extends PureComponent {

  static propTypes = propTypes;

  static contextTypes = contextTypes;

  renderAdminArea() {
    return (
      <Components.ShowIf check={Companies.options.mutations.edit.check} document={this.props.document}>
        <div className="posts-edit-form-admin">
          <div className="posts-edit-form-id">ID: {this.props.document._id}</div>
          <Components.PostsStats post={this.props.document} />
        </div>
      </Components.ShowIf>
    )
  }

  render() {
    console.log('document => ', this.props.document);
    return (
      <div className="posts-edit-form">
        {Users.isAdmin(this.props.currentUser) && this.renderAdminArea()}
        <Components.SmartForm
          collection={Companies}
          documentId={this.props.document._id}
          mutationFragment={getFragment('CompaniesPage')}
          successCallback={company => {
            this.props.closeModal();
            this.props.flash(this.context.intl.formatMessage({ id: 'companies.edit_success' }, { title: company.title }), 'success');
          }}
          removeSuccessCallback={({ documentId, documentTitle }) => {
            // post edit form is being included from a single post, redirect to index
            // note: this.props.params is in the worst case an empty obj (from react-router)
            if (this.props.params._id) {
              this.props.router.push('/companies');
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

registerComponent('CompaniesEditForm', CompaniesEditForm, withMessages, withRouter, withCurrentUser);
