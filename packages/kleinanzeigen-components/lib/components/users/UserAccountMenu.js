/*

User menu (when not logged in)

*/

import { Components, registerComponent } from 'meteor/vulcan:core';

import React from 'react';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { STATES } from 'meteor/vulcan:accounts';

import {
  DropdownToggle, DropdownMenu, Dropdown
} from 'reactstrap';

class UsersAccountMenu extends React.Component {

  state = {
    dropdownOpen: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const { state } = this.props;
    return (
      <Dropdown id="user-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav caret>
          <Components.Icon name="user" />
          <FormattedMessage id="users.sign_up_log_in" />
        </DropdownToggle>
        <DropdownMenu right>
          <Components.AccountsLoginForm formState={state? STATES[state] : STATES.SIGN_UP} />
        </DropdownMenu>
      </Dropdown>
    );
  }
}

UsersAccountMenu.displayName = "UsersAccountMenu";

registerComponent('UsersAccountMenu', UsersAccountMenu);
