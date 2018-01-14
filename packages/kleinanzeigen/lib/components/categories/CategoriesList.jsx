import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import { Button, DropdownItem, DropdownMenu } from 'reactstrap'

import { withRouter } from 'react-router';

import { withApollo } from 'react-apollo';

import { Link } from 'react-router';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Components, registerComponent, withList, Utils } from "meteor/vulcan:core";

import { Categories } from '../../modules/categories/index.js';

class CategoriesList extends PureComponent {

  state = {
    openModal: false,
  };

  openCategoryEditModal = (index) => {
    // edit category modals are numbered from 1 to n
    this.setState({ openModal: index+1 });
  };

  closeModal = () => {
    this.setState({openModal: false});
  };

  getCurrentCategoriesArray = () => {
    const currentCategories = _.clone(this.props.location.query.cat);
    if (currentCategories) {
      return Array.isArray(currentCategories) ? currentCategories : [currentCategories]
    }
    return [];
  };

  getCategoryLink = (slug) => {
    const categories = this.getCurrentCategoriesArray();
    return {
      pathname: Utils.getRoutePath('posts.list'),
      query: {
        ...this.props.location.query,
        cat: categories.includes(slug) ? _.without(categories, slug) : categories.concat([slug])
      }
    }
  };

  getNestedCategories = () => {
    const categories = this.props.results;

    // check if a category is currently active in the route
    const currentCategorySlug = this.props.router.location.query && this.props.router.location.query.cat;
    const currentCategory = Categories.findOneInStore(this.props.client.store, { slug: currentCategorySlug });
    const parentCategories = Categories.getParents(currentCategory, this.props.client.store);

    // decorate categories with active and expanded properties
    const categoriesClone = _.map(categories, category => {
      return {
        ...category, // we don't want to modify the objects we got from props
        active: currentCategory && category.slug === currentCategory.slug, 
        expanded: parentCategories && _.contains(_.pluck(parentCategories, 'slug'), category.slug)
      };
    }); 

    const nestedCategories = Utils.unflatten(categoriesClone, { idProperty: '_id', parentIdProperty: 'parentId' });
    return nestedCategories;
  };

  renderCategoryNewModal = () => {
    return (
      <Components.ShowIf check={Categories.options.mutations.new.check}>
        <div className="categories-new-button category-menu-item dropdown-item">
          <Components.ModalTrigger
            title={<FormattedMessage id="categories.new"/>}
            component={<Button color="link">
              <FormattedMessage id="categories.new"/>
            </Button>}
          >
            <Components.CategoriesNewForm/>
          </Components.ModalTrigger>
        </div>
      </Components.ShowIf>
    )
  };

  render() {
    const allCategoriesQuery = _.clone(this.props.router.location.query);
    delete allCategoriesQuery.cat;
    const nestedCategories = this.getNestedCategories();
    return (
      <Components.ButtonDropdown
        // className="categories-list btn-secondary"
        // title={React.cloneElement(FormattedMessage, { id: 'categories' })}
        title={<FormattedMessage id="categories"/>}
        id="categories-dropdown"
        color="link"
      >
        <DropdownMenu>
          <DropdownItem
            key={'categories-all-key'}
            tag={Link} to={{ pathname:"/", query: allCategoriesQuery }}
          >
            <FormattedMessage id="categories.all"/>
          </DropdownItem>
          {
            // categories data are loaded
            !this.props.loading ?
              // there are currently categories
              nestedCategories && nestedCategories.length > 0 &&
                nestedCategories.map((category, index) => {
                  return (
                    <Components.CategoriesNode
                      key={index}
                      category={category}
                      index={index}
                      openModal={this.openCategoryEditModal}
                    />
                  );
                })
              // categories are loading
              :
              <DropdownItem key={'loading-key'}>
                <Components.Loading />
              </DropdownItem>
          }
          {this.renderCategoryNewModal()}
        </DropdownMenu>
      </Components.ButtonDropdown>
    )
  }
}

CategoriesList.propTypes = {
  results: PropTypes.array,
};

const options = {
  collection: Categories,
  queryName: 'categoriesListQuery',
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent('CategoriesList', CategoriesList, withRouter, withApollo, [withList, options]);
