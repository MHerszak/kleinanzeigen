import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Components, registerComponent } from 'meteor/vulcan:core';

import { DropdownItem } from 'reactstrap'

class CategoriesNode extends PureComponent {

  renderCategory = (category) => {
    return (
      <Components.Category
        category={category}
        key={category._id}
        openModal={this.props.openModal}
      />
    )
  };

  renderChildren = (children) => {
    return children.map(category => <CategoriesNode category={category} key={category._id} />)
  };

  render() {
    const category = this.props.category;
    const children = this.props.category.childrenResults;
    return (
      <DropdownItem key={this.props.category._id}>
        {this.renderCategory(category)}
        {children && this.renderChildren(children)}
      </DropdownItem>
    )
  }

}

CategoriesNode.propTypes = {
  category: PropTypes.object.isRequired, // the current category
};

registerComponent('CategoriesNode', CategoriesNode);
