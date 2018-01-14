import React from 'react';

import PropTypes from 'prop-types';

import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';

import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';

import { Jobs } from '../../modules';

import { withRouter } from 'react-router'

const JobsNewForm = (props, context) => (
  <Components.ShowIf
    check={Jobs.options.mutations.new.check}
    failureComponent={<div>
      <p className="posts-new-form-message">
        <FormattedMessage id="jobs.sign_up_or_log_in_first" />
      </p>
      <Components.AccountsLoginForm />
    </div>}
  >
    <div className="posts-new-form">
      <Components.SmartForm
        collection={Jobs}
        mutationFragment={getFragment('JobsPage')}
        successCallback={post => {
          props.router.push({ pathname: props.redirect || Jobs.getPageUrl(post)});
          props.flash(context.intl.formatMessage({ id: 'jobs.created_message' }), 'success');
        }}
      />
    </div>
  </Components.ShowIf>
);

JobsNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
};

JobsNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};

JobsNewForm.displayName = 'JobsNewForm';

registerComponent('JobsNewForm', JobsNewForm, withRouter, withMessages);
