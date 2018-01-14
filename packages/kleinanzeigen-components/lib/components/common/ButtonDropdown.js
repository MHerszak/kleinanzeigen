import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { ButtonDropdown, DropdownToggle } from 'reactstrap'

// import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Components, registerComponent } from "meteor/vulcan:core";

const propTypes = {
  title: PropTypes.node,
};

class ButtonDropdownMH extends PureComponent {

  static propTypes = propTypes;

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };

  render() {
    const { title, color, children, tag, ...rest } = this.props;
    return (
      <ButtonDropdown
        isOpen={this.state.isOpen}
        toggle={this.toggle}
        {...rest}
      >
        <DropdownToggle color={color} caret={rest.caret}>
          {title}
        </DropdownToggle>
        {children}
      </ButtonDropdown>
    );
  }
}

registerComponent('ButtonDropdown', ButtonDropdownMH);
