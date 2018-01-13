import React from 'react';

import { Alert } from 'reactstrap';

import classNames from 'classnames';

import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

const Error = ({error}) => (
  <Alert className="flash-message" bsStyle="danger">
    <FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}
  </Alert>
);

const CompaniesList = (props) => {
  const {
    // className,
    results,
    loading,
    // count,
    // totalCount,
    // loadMore,
    // showHeader = true,
    showLoadMore = true,
    networkStatus,
    currentUser,
    error,
    // terms
  } = props;

  const renderListItems = document => (
    <Components.CompaniesItem
      key={document._id}
      document={document}
      currentUser={currentUser}
    />
  );

  const renderPostLoading = () => (
    <div className="posts-list-content">
      <Components.PostsLoading />
    </div>
  );

  const renderPostsNoResults = () => (
    <div className="posts-list-content">
      <Components.PostsNoResults />
    </div>
  );

  const renderLoading = () => (
    <div className={classNames(props.className, 'posts-list')}>
      {props.showHeader && <Components.PostsListHeader />}
      {props.error && <Error error={Utils.decodeIntlError(props.error)} />}
      {renderPostLoading()}
    </div>
  );

  const renderNoResults = () => (
    <div className={classNames(props.className, 'posts-list')}>
      {props.showHeader && <Components.PostsListHeader />}
      {props.error && <Error error={Utils.decodeIntlError(props.error)} />}
      {renderPostsNoResults()}
    </div>
  );

  const renderResults = () => {
    const hasMore = props.totalCount > props.results.length;
    return (
      <div className={classNames(props.className, 'companies-list', `companies-list-${props.terms.view}`)}>
        {/*{props.showHeader && <Components.PostsListHeader />}*/}
        {props.error && <Error error={Utils.decodeIntlError(error)} />}
        <div className="companies-list-content">
        {/* <div className="posts-list-content"> */}
          {props.results.map(renderListItems)}
        </div>
        {showLoadMore &&
        hasMore ?
          <Components.PostsLoadMore
            loading={loadingMore}
            loadMore={props.loadMore}
            count={props.count}
            totalCount={props.totalCount}
          /> : <Components.PostsNoMore />}
      </div>
    );
  };

  const loadingMore = networkStatus === 2;

  if (results && results.length) {
    return renderResults()
  } else if (loading) {
    return renderLoading();
  } else {
    return renderNoResults();
  }
};

const options = {
  collection: Companies,
  queryName: 'companiesListQuery',
  fragmentName: 'CompaniesList',
};

registerComponent('CompaniesList', CompaniesList, [withList, options], withCurrentUser);