import React from 'react';

import PropTypes from 'prop-types';

import { Posts } from '../../modules/posts/index';

import { Alert, ListGroup } from 'reactstrap';

import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import classNames from 'classnames';

const Error = ({error}) => (
  <Alert className="flash-message" bsStyle="danger">
    <FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}
  </Alert>
);

const PostsFeed = (props) => {

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
    terms
  } = props;

  const renderPostItems = (post) => (
    <Components.PostsFeedItem
      post={post}
      key={post._id}
      currentUser={currentUser}
      terms={terms}
      className="post-feed-item"
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
      {props.error && <Error error={Utils.decodeIntlError(props.error)} />}
      {renderPostLoading()}
    </div>
  );

  const renderNoResults = () => (
    <div className={classNames(props.className, 'posts-list')}>
      {props.error && <Error error={Utils.decodeIntlError(props.error)} />}
      {renderPostsNoResults()}
    </div>
  );

  const renderResults = () => {
    const hasMore = props.totalCount > props.results.length;
    return (
      <div>
        {props.error && <Error error={Utils.decodeIntlError(error)} />}
        <ListGroup className="post feed">
          {props.results.map(renderPostItems)}
        </ListGroup>
        {showLoadMore ?
          hasMore ?
            <Components.PostsLoadMore
              loading={loadingMore}
              loadMore={props.loadMore}
              count={props.count}
              totalCount={props.totalCount}
            /> : <Components.PostsNoMore /> : null}
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

PostsFeed.displayName = "PostsFeed";

PostsFeed.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

PostsFeed.contextTypes = {
  intl: intlShape
};

const options = {
  collection: Posts,
  queryName: 'postsListQuery',
  fragmentName: 'PostsList',
};

registerComponent('PostsFeed', PostsFeed, withCurrentUser, [withList, options]);
