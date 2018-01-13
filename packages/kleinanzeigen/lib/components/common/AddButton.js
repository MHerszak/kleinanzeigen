import React, { PureComponent } from 'react';

// import PropTypes from 'prop-types';

import { ButtonToolbar } from 'reactstrap'

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Components, registerComponent, withList, Utils } from "meteor/vulcan:core";

class AddButton extends PureComponent {

  renderPostsNewButton = () => (<Components.PostsNewButton color="link" />);

  renderCompaniesNewButton = () => (<Components.CompaniesNewButton color="link" />);

  render() {
    return (
      <ButtonToolbar
        title={<Components.Icon name="ellipsis-h" />}
        id="categories-dropdown"
        color="link"
        // aria-haspopup
      >
        {this.renderPostsNewButton()}
        {this.renderCompaniesNewButton()}
      </ButtonToolbar>
    )
  }
}

// AddButton.propTypes = {
//   results: PropTypes.array,
// };

registerComponent('AddButton', AddButton);
