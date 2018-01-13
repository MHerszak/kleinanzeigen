import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { NavItem } from 'reactstrap';

import { withRouter } from 'react-router'

import Users from 'meteor/vulcan:users';

import { ModalTrigger, Components, registerComponent } from 'meteor/vulcan:core';

// import { Categories } from '../../modules/categories/index.js';

class Category extends PureComponent {

  renderEdit = () => {
    return (
      <Components.ModalTrigger title="Edit Category" component={<a className="edit-category-link">
        <Components.Icon name="edit"/>
      </a>}
      >
        <Components.CategoriesEditForm category={this.props.category}/>
      </Components.ModalTrigger>
    )
  };

  render() {
    const { category, index, router } = this.props;
    // const currentQuery = router.location.query;
    const currentCategorySlug = router.location.query.cat;
    const newQuery = _.clone(router.location.query);
    newQuery.cat = category.slug;

    return (
      <div>
        <NavItem
          key={category._id}
          tag={Link}
          to={{ pathname: '/', query: newQuery }}
        >
          {currentCategorySlug === category.slug ? <Components.Icon name="voted"/> :  null}
          {category.name}
        </NavItem>
        <Components.ShowIf
          check={Users.isAdmin}
          // check={Categories.options.mutations.edit.check}
          document={category}
        >
          {this.renderEdit()}
        </Components.ShowIf>
      </div>
    )
  }
}

Category.propTypes = {
  category: PropTypes.object,
  index: PropTypes.number,
  currentCategorySlug: PropTypes.string,
  openModal: PropTypes.func
};

registerComponent('Category', Category, withRouter);
