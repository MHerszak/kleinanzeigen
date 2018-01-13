import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Formsy from 'formsy-react';

import FRC from 'formsy-react-components';

import { intlShape } from 'meteor/vulcan:i18n';

import { registerComponent, Components, Utils } from 'meteor/vulcan:core';

import { withRouter, Link } from 'react-router'

const Input = FRC.Input;

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

class SearchForm extends Component {

  static propTypes = {
    collection: PropTypes.string
  };

  static defaultProps = {
    collection: 'posts'
  };

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      search: props.router.location.query.query || ''
    }
  }

  // note: why do we need this?
  componentWillReceiveProps(nextProps) {
    this.setState({
      search: this.props.router.location.query.query || ''
    });
  }

  search(data) {

    const router = this.props.router;
    const collection = this.props.collection;
    const routerQuery = _.clone(router.location.query);
    delete routerQuery.query;

    const query = data.searchQuery === '' ? routerQuery : { ...routerQuery, query: data.searchQuery };

    delay(() => {
      router.push({ pathname: Utils.getRoutePath(`${collection}.list`), query: query });
    }, 700 );

  }

  render() {
    const resetQuery = _.clone(this.props.location.query);
    delete resetQuery.query;
    const collection = this.props.collection;
    return (
      <div className="search-form">
        <Formsy.Form onChange={this.search}>
          <Input
            name="searchQuery"
            value={this.state.search}
            placeholder={this.context.intl.formatMessage({ id: `${collection}.search` })}
            type="text"
            layout="elementOnly"
          />
          {this.state.search !== '' &&
            <Link className="search-form-reset" to={{ pathname: '/', query: resetQuery}}>
              <Components.Icon name="close" />
            </Link>}
        </Formsy.Form>
      </div>
    )
  }
}

SearchForm.contextTypes = {
  intl: intlShape
};

registerComponent('SearchForm', SearchForm, withRouter);