import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Alert } from 'reactstrap'

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';

import { Posts } from '../../modules/posts/index.js';

const Error = ({error}) => (
  <Alert className="flash-message" bsStyle="danger">
    <FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}
  </Alert>
);

const PostsList = (props) => {

  const {
    // className,
    results,
    loading,
    // count,
    // totalCount,
    // loadMore,
    showHeader = true,
    showLoadMore = true,
    networkStatus,
    currentUser,
    error,
    terms
  } = props;

  const renderPostItems = (post) => (
    <Components.PostsItem post={post} key={post._id} currentUser={currentUser} terms={terms} className="post" />
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

  const renderLoadMore = () => (
    <Components.PostsLoadMore
      loading={loadingMore}
      loadMore={props.loadMore}
      count={props.count}
      totalCount={props.totalCount}
    />
  );

  const renderResults = () => {
    const hasMore = props.totalCount > props.results.length;
    return (
      <div className={classNames(props.className, 'posts-list', `posts-list-${props.terms.view}`)}>
        {props.showHeader && <Components.PostsListHeader />}
        {props.error && <Error error={Utils.decodeIntlError(error)} />}
        <div className="posts-list-content">
          {props.results.map(renderPostItems)}
        </div>
        {showLoadMore && hasMore ? renderLoadMore() : <Components.PostsNoMore />}
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

PostsList.displayName = "PostsList";

PostsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

PostsList.contextTypes = {
  intl: intlShape
};

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
};

registerComponent('PostsList', PostsList, withCurrentUser, [withList, options]);
