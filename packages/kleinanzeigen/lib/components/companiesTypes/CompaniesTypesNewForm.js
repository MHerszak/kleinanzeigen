import React from 'react';

import PropTypes from 'prop-types';

import { Components, registerComponent, getRawComponent, getFragment, withMessages } from 'meteor/vulcan:core';

import { intlShape, FormattedMessage } from 'meteor/vulcan:i18n';

import { CompaniesTypes } from '../../modules';

import { withRouter } from 'react-router'

const CompaniesNewForm = (props, context) => (
  <Components.ShowIf
    check={CompaniesTypes.options.mutations.new.check}
    failureComponent={<div>
      <p className="posts-new-form-message">
        <FormattedMessage id="companies.sign_up_or_log_in_first" />
      </p>
      <Components.AccountsLoginForm />
    </div>}
  >
    <div className="posts-new-form">
      <Components.SmartForm
        collection={CompaniesTypes}
        mutationFragment={getFragment('CompaniesTypesList')}
        // mutationFragment={getFragment('CompaniesTypesPage')}
        successCallback={companiesType => {
          // props.closeModal();
          // props.router.push({ pathname: props.redirect || Companies.getPageUrl(post) });
          props.flash(
            context.intl.formatMessage({
              id: 'companies_types.created_message',
            }, { name: companiesType.name }), 'success');
        }}
      />
    </div>
  </Components.ShowIf>
);

CompaniesNewForm.propTypes = {
  closeModal: PropTypes.func,
  router: PropTypes.object,
  flash: PropTypes.func,
  redirect: PropTypes.string,
};

CompaniesNewForm.contextTypes = {
  closeCallback: PropTypes.func,
  intl: intlShape
};

CompaniesNewForm.displayName = 'CompaniesNewForm';

registerComponent('CompaniesTypesNewForm', CompaniesNewForm, withRouter, withMessages);
