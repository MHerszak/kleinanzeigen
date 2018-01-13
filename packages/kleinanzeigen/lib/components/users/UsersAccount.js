/*

Edit user account page

*/

import React from 'react';

import PropTypes from 'prop-types';

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import Users from 'meteor/vulcan:users';

import { STATES } from 'meteor/vulcan:accounts';

import { Components, registerComponent, withCurrentUser, withMessages } from 'meteor/vulcan:core';

import mapProps from 'recompose/mapProps';

const UsersAccount = (props, context) => {
  const { terms = {} } = props;
  const document = terms && terms.documentId ? { _id: terms.documentId } : { slug: terms.slug };
  return (
    <div className="posts-page">

      {/*<Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />*/}

      <section className="content">
        {/*<div className="container">
          <div className="row">
            <Components.Breadcrumbs title={context.intl.formatMessage({ id: 'users.edit_account' })} />
          </div>
        </div>*/}
        <div className="container">
          <div className="row">
            <div className="col-12 post">
              <Components.ShowIf
                check={Users.options.mutations.edit.check}
                document={document}
                failureComponent={<FormattedMessage id="app.noPermission"/>}
              >
                <div className="page users-edit-form">
                  <h2 className="page-title users-edit-form-title"><FormattedMessage id="users.edit_account"/></h2>

                  <div className="change-password-link">
                    <Components.ModalTrigger
                      size="small"
                      title={context.intl.formatMessage({ id: 'accounts.change_password' })}
                      component={<a href="#"><FormattedMessage id="accounts.change_password" /></a>}
                    >
                      <Components.AccountsLoginForm formState={STATES.PASSWORD_CHANGE} />
                    </Components.ModalTrigger>
                  </div>

                  <Components.SmartForm
                    collection={Users}
                    {...terms}
                    successCallback={user => {
                      props.flash(context.intl.formatMessage({ id: 'users.edit_success' }, { name: Users.getDisplayName(user) }), 'success')
                    }}
                    showRemove={true}
                  />
                </div>
              </Components.ShowIf>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

UsersAccount.propTypes = {
  terms: PropTypes.object, // a user is defined by its unique _id or its unique slug
};


UsersAccount.contextTypes = {
  intl: intlShape
};

UsersAccount.displayName = 'UsersAccount';

const mapPropsFunction = (props) => {
  const { routeParams = {}, currentUser = {} } = props;
  if (currentUser) {
    return ({
      ...props,
      terms: routeParams && routeParams.slug ? { slug: routeParams.slug } : { documentId: currentUser._id }});
  }
  return {};
};

registerComponent('UsersAccount', UsersAccount, mapProps(mapPropsFunction), withMessages, withCurrentUser);
