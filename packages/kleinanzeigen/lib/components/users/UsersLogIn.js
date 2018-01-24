/*

Users log in form

*/

import React from 'react';

import { Link } from 'react-router';

import { Container, Row, Col } from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

// import { STATES } from 'meteor/vulcan:accounts';

// const UsersLogIn = ({state}) => (
//   <div className="page">
//     <Components.AccountsLoginForm showSignUpLink={false} />
//     <p>
//       <FormattedMessage id="accounts.dont_have_an_account"/>
//       <Link to="/sign-up">
//         <FormattedMessage id="accounts.sign_up_here"/>
//       </Link>
//     </p>
//   </div>
// );

const UsersLogIn = ({ state }) => (
  <div className="page">
    <Container style={{ padding: '40px 0' }}>
      <Row>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={12} xs={12}>
          <h4 className="text-center"><FormattedMessage id="accounts.log_in_here" /></h4>
        </Col>
      </Row>
      <Row>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={12} xs={12}>
          <Components.AccountsLoginForm showSignUpLink={false} />
        </Col>
        <Col lg={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }} sm={12} xs={12}>
          <p className="text-center">
            <FormattedMessage id="accounts.dont_have_an_account" />{' '}
            <Link to="/sign-up">
              <FormattedMessage id="accounts.sign_up_here" />
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  </div>
);

UsersLogIn.displayName = 'UsersLogIn';

registerComponent('UsersLogIn', UsersLogIn);

// export default UsersLogIn;
