/*

Users sign up form

*/

import React from 'react';

import { Link } from 'react-router';

import { Container, Row, Col } from 'reactstrap';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { STATES } from 'meteor/vulcan:accounts';

import { Components, registerComponent } from 'meteor/vulcan:core';

const UsersSignUp = ({state}) => (
  <div className="page">
    <Container style={{ padding: '40px 0' }}>
      <Row>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={12} xs={12}>
          <h4 className="text-center"><FormattedMessage id="accounts.sign_up_here" /></h4>
        </Col>
      </Row>
      <Row>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={12} xs={12}>
          <Components.AccountsLoginForm formState={STATES.SIGN_UP} showSignInLink={false}/>
        </Col>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={12} xs={12}>
          <p className="text-center">
            <FormattedMessage id="accounts.already_have_an_account" />{' '}
            <Link to="/log-in">
              <FormattedMessage id="accounts.log_in_here" />
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

UsersSignUp.displayName = 'UsersSignUp';

registerComponent('UsersSignUp', UsersSignUp);

// export default UsersSignUp;
