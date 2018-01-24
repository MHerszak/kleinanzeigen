import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router';

import {
  Components, replaceComponent, getRawComponent, registerComponent, withList, Utils
} from "meteor/vulcan:core";

import { CompaniesTypes } from './../../modules';

class CompaniesTypesListFilter extends PureComponent {

  getCurrentCategoriesArray = () => {
    const currentCategories = _.clone(this.props.location.query.cat);
    if (currentCategories) {
      return Array.isArray(currentCategories) ? currentCategories : [currentCategories]
    }
    return [];
  };

  getCompaniesTypeLink = (slug) => {
    const categories = this.getCurrentCategoriesArray();
    return {
      pathname: Utils.getRoutePath('companies.list'),
      query: {
        ...this.props.location.query,
        cat: categories.includes(slug) ? _.without(categories, slug) : categories.concat([slug])
      }
    }
  };

  renderCategory = (companiesType, index) => (
    <li className="category-menu-item" key={index}>
      <Link className="posts-category" to={this.getCompaniesTypeLink(companiesType.slug)}>{companiesType.name}</Link>
    </li>
  );

  render() {
    const categories = this.props.results;
    // const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    return (
      <ul className="categories-list">
        {categories && categories.length > 0 ? _.sortBy(categories, "name").map((category, index) => this.renderCategory(category, index)) : null}
      </ul>
    );
  }
}

CompaniesTypesListFilter.contextTypes = {
  currentUser: PropTypes.object,
  toggleFilters: PropTypes.func,
};

const companiesTypesFilterOptions = {
  collection: CompaniesTypes,
  queryName: 'companiesTypesListQuery',
  fragmentName: 'CompaniesTypesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('CompaniesTypesListFilter', CompaniesTypesListFilter, withRouter, [withList, companiesTypesFilterOptions]);
