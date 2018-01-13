import React from 'react';

// import PropTypes from 'prop-types';

import { STATES } from 'meteor/vulcan:accounts';

import { Tooltip } from 'reactstrap';

import { registerComponent } from 'meteor/vulcan:core';

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

class ToolTipC extends React.Component {

  state = {
    tooltipOpen: false
  };

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  render() {
    const triggerComponent = this.props.component ? React.cloneElement(this.props.component, { id: this.props.id }) : <a href="#" id={this.props.id}>tooltip</a>;
    const tooltipContent = React.cloneElement(this.props.content);
    return (
      <div>
        {triggerComponent}
        <Tooltip
          placement={this.props.placement}
          isOpen={this.state.tooltipOpen}
          autohide={false}
          target={this.props.id}
          toggle={this.toggle}
        >
          {tooltipContent}
        </Tooltip>
      </div>
    );
  }
}

registerComponent('Tooltip', ToolTipC);
