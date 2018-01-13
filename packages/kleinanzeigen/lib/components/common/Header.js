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

  // renderPostsNewButton = () => (
  //   <NavItem>
  //     <NavLink>
  //     {/*<NavLink tag={Link} to="/listing/new">*/}
  //       <Components.PostsNewButton color="success" />
  //     </NavLink>
  //   </NavItem>
  // );

  renderCommonNewButton = () => (
    <NavItem>
      <NavLink>
        <Components.AddButton />
      </NavLink>
    </NavItem>
  );

  // renderUserMenu = () => (
  //   <NavItem>
  //     <Components.UsersMenu />
  //   </NavItem>
  // );

  renderUserAccountsMenuItem = () => {
    const { currentUser } = this.props;
    return currentUser ? <Components.UsersMenu /> : <UsersAccountMenuButton />;
    // return !currentUser ? <UsersAccountMenuButton /> : <Components.UsersMenu />;
  };

  // renderHowTo = () => {
  //   // const { currentUser } = this.props;
  //   return (
  //     <NavItem>
  //       <NavLink tag={Link} to="/how-to">
  //         <Button color="link">Guidelines</Button>
  //       </NavLink>
  //     </NavItem>
  //   );
  // };
  //
  renderCompanyLink = () => {
    // const { currentUser } = this.props;
    return (
      <NavItem>
        <NavLink tag={Link} to="/companies">
          <Button color="link">
            <FormattedMessage id="companies.link.companies" />
          </Button>
        </NavLink>
      </NavItem>
    );
  };

  renderCatList = () => {
    return (
      <NavItem>
        <NavLink tag="div">
          <Components.CategoriesList />
        </NavLink>
      </NavItem>
    );
  };

  // renderSearchForm = () => {
  //   return (
  //     <NavItem>
  //       <NavLink tag="div" style={{ width: 600 }}>
  //         <Components.SearchForm />
  //       </NavLink>
  //     </NavItem>
  //   );
  // };

  // renderSearchForm = () => {
  //   return (
  //     <Col lg={{ size: 8, offset: 2 }} xs={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }}>
  //       <Components.SearchForm />
  //     </Col>
  //   )
  // };

  render() {
    // const { currentUser } = this.props;
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
                {/*{this.renderHowTo()}
                {this.renderAbout()}*/}
                {this.renderCatList()}
                {this.renderCompanyLink()}
                {/*{this.renderSearchForm()}*/}
              </Nav>
              <Nav navbar className="ml-auto">
                {/*<div className={`col-lg-${currentUser ? 4 : 3} selecttopic col-sm-2 col-md-2`}>*/}
                {/*{this.renderCatList()}*/}
                {/*</div>*/}
                {/*/!*<div className={`col-lg-${currentUser ? 11 : 8} search col-sm-2 col-md-2`}>*/}
                {/*{this.renderSearch()}*/}
                {/*</div>*!/*/}
                <div className="avt">
                  {/*<div className={`col-lg-${currentUser ? 3 : 2} avt`}>*/}
                  {this.renderCommonNewButton()}
                  {/*{this.renderPostsNewButton()}*/}
                </div>
                {this.renderUserAccountsMenuItem()}
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
