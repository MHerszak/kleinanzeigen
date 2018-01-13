import React from 'react';

import PropTypes from 'prop-types';

import { Button } from 'reactstrap';

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';


const CompaniesNewButton = (props, context) => {
  const size = props.currentUser ? 'large' : 'small';
  const color = props.color;
  const button = (
    <Button color={color}>
      <Components.Icon name="building-o" />
      {/*<FormattedMessage id="companies.new_post" />*/}
    </Button>
  );
  return (
    <Components.ModalTrigger
      size={size}
      title={context.intl.formatMessage({ id: 'companies.new_post' })}
      component={button}
    >
      <Components.CompaniesNewForm />
    </Components.ModalTrigger>
  );
};

CompaniesNewButton.displayName = 'CompaniesNewButton';

CompaniesNewButton.propTypes = {
  currentUser: PropTypes.object,
};

CompaniesNewButton.contextTypes = {
  messages: PropTypes.object,
  intl: intlShape
};

registerComponent('CompaniesNewButton', CompaniesNewButton, withCurrentUser);
