/*

Users log in form

*/

import React from 'react';

import { Link } from 'react-router';

import { Components, registerComponent } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { STATES } from 'meteor/vulcan:accounts';

const UsersLogIn = ({state}) => (
  <div className="page">
    <Components.AccountsLoginForm showSignUpLink={false}/>
    <p>
      <FormattedMessage id="accounts.dont_have_an_account"/>
      <Link to="/sign-up">
        <FormattedMessage id="accounts.sign_up_here"/>
      </Link>
    </p>
  </div>
);

UsersLogIn.displayName = 'UsersLogIn';

registerComponent('UsersLogIn', UsersLogIn);

// export default UsersLogIn;
