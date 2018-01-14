import React from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Alert } from 'reactstrap'

import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

import { Components, registerComponent, withList, withCurrentUser, Utils } from 'meteor/vulcan:core';

import { Jobs } from '../../modules/jobs/index.js';

const Error = ({error}) => (
  <Alert className="flash-message" bsStyle="danger">
    <FormattedMessage id={error.id} values={{value: error.value}}/>{error.message}
  </Alert>
);

const JobsList = (props) => {

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

  const renderListItems = (document) => (
    <Components.JobsItem
      document={document}
      key={document._id}
      currentUser={currentUser}
      terms={terms}
      className="post"
    />
  );

  const renderMinimumListItems = (document) => (
    <Components.JobsItemMinimum
      document={document}
      key={document._id}
      currentUser={currentUser}
      terms={terms}
    />
  );

  const renderPostLoading = () => (
    <div className="posts-list-content">
      <Components.PostsLoading />
    </div>
  );

  // const renderPostsNoResults = () => (
  //   <div className="posts-list-content">
  //     <Components.PostsNoResults />
  //   </div>
  // );

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
      {/* {renderPostsNoResults()} */}
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
    const renderFuncItem = !props.minimum ? renderListItems : renderMinimumListItems;
    return (
      <div className={classNames(props.className, 'jobs-list', `jobs-list-${props.terms.view}`)}>
        {/* {props.showHeader && <Components.PostsListHeader />} */}
        {props.error && <Error error={Utils.decodeIntlError(error)} />}
        <div className="jobs-list-content">
          {props.results.map(renderFuncItem)}
        </div>
        {showLoadMore && hasMore && renderLoadMore()}
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

JobsList.displayName = "JobsList";

JobsList.propTypes = {
  results: PropTypes.array,
  terms: PropTypes.object,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  count: PropTypes.number,
  totalCount: PropTypes.number,
  loadMore: PropTypes.func,
  showHeader: PropTypes.bool,
};

JobsList.contextTypes = {
  intl: intlShape
};

const options = {
  collection: Jobs,
  queryName: 'jobsListQuery',
  fragmentName: 'JobsList',
};

registerComponent('JobsList', JobsList, withCurrentUser, [withList, options]);
