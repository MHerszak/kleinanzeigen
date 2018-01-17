/* Header */

import React from 'react';

import PropTypes from 'prop-types';

import { Navbar, Container } from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

// import { FormattedMessage } from 'meteor/vulcan:i18n';

class SubHeader extends React.Component {

  static displayName = 'SubHeader';

  static propTypes = {
    noFilter: PropTypes.bool
  };

  static defaultProps = {
    noFilter: false,
  };

  renderSearchForm = () => {
    const { noFilter, collection } = this.props;
    const styleThis = {
      width: noFilter ? '70%' : '50%',
      marginLeft: 'auto',
      marginRight: noFilter ? 'auto' : 0,
    };
    // if (collection === 'companies') {
    //   return (
    //     <div style={styleThis}>
    //       <Components.CompaniesSearchForm />
    //     </div>
    //   )
    // }
    return (
      <div style={styleThis}>
        <Components.SearchForm collection={collection} />
      </div>
    );
  };

  render() {
    return (
      <div className="action-nav">
        <Container>
          <Navbar expand="md">
            {!this.props.noFilter && <Components.PostsViews />}
            {!this.props.noFilter && <Components.CategoriesList />}
            {this.renderSearchForm()}
          </Navbar>
        </Container>
      </div>
    );
  }
}

registerComponent('SubHeader', SubHeader);
