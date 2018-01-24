/*

Header

*/

import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, Container, Button,
} from 'reactstrap';

import { STATES } from 'meteor/vulcan:accounts';

import { Components, registerComponent, withCurrentUser, getSetting, } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

// Components
const UsersAccountMenuButton = () => (
  <Components.ModalTrigger
    title="Sign Up/Log In"
    size="small"
    component={<NavItem>
        <NavLink>
          <Button color="link">
            {/*<Components.Icon name="user"/>*/}Sign Up/Log In
          </Button>
        </NavLink>
      </NavItem>}
  >
    <Components.AccountsLoginForm formState={STATES.SIGN_IN}/>
  </Components.ModalTrigger>
);

// const NewListingButton = () => (
//   <Components.Tooltip
//     placement="bottom"
//     id="new_submission"
//     component={<NavItem>
//       <NavLink tag={Link} to="/listing/new">
//         <FormattedMessage id="listing.new" />
//       </NavLink>
//     </NavItem>}
//     content={<FormattedMessage id="listing.new.navigation" />}
//   />
// );

const propTypes = {
  currentUser: PropTypes.object,
  // isSearch: PropTypes.bool,
};

const defaultProps = {
  currentUser: null,
  // isSearch: false,
};

class Header extends React.Component {

  static displayName = 'Header';

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  state = {
    isOpen: false,
    modalOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  renderCommonNewButton = () => (
    <NavItem>
      <NavLink>
        <Components.AddButton />
      </NavLink>
    </NavItem>
  );

  renderUserAccountsMenuItem = () => {
    const { currentUser } = this.props;
    return currentUser && <Components.UsersMenu />;
    // return currentUser ? <Components.UsersMenu /> : <UsersAccountMenuButton />;
  };

  renderCompanyLink = () => {
    // const { currentUser } = this.props;
    return (
      <NavItem>
        <NavLink tag={Link} to="/companies">
          <FormattedMessage id="companies.link.companies" />
        </NavLink>
      </NavItem>
    );
  };

  renderJobsLink = () => {
    // const { currentUser } = this.props;
    return (
      <NavItem>
        <NavLink tag={Link} to="/jobs">
          <FormattedMessage id="jobs.link.jobs" />
        </NavLink>
      </NavItem>
    );
  };

  renderLoginLink = () => {
    // const { currentUser } = this.props;
    if(this.props.currentUser) return null;
    return (
      <NavItem>
        <NavLink tag={Link} to="/log-in">
          <FormattedMessage id="accounts.login_link" />
        </NavLink>
      </NavItem>
    );
  };

  render() {
    const logoUrl = getSetting('logoUrl');
    const siteTitle = getSetting('title', 'My App');
    const tagline = getSetting('tagline');
    return (
      <div className="headernav">
        <Container>
          <Navbar light expand="md">
            {logoUrl ? <Components.Logo height={40} logoUrl={logoUrl} siteTitle={siteTitle} /> :
            <NavbarBrand tag={Link} to="/">
              {tagline && <h5 className="tagline">{tagline}</h5>}
            </NavbarBrand>}
            <NavbarToggler onClick={this.toggle} style={{ margin: '0 0 0 auto' }} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                {this.renderCompanyLink()}
                {this.renderJobsLink()}
              </Nav>
              <Nav navbar className="ml-auto">
                <div className="avt">
                  {this.renderCommonNewButton()}
                </div>
                {this.renderUserAccountsMenuItem()}
                {this.renderLoginLink()}
              </Nav>
            </Collapse>
            <div className="clearfix"></div>
          </Navbar>
        </Container>
      </div>
    );
  }
}

registerComponent('Header', Header, withCurrentUser);
