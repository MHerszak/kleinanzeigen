import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withList, withCurrentUser, Components, registerComponent, Utils } from 'meteor/vulcan:core';
import { Comments } from '../../modules/comments/index.js';

const PostsCommentsThread = (props, /* context*/) => {

  const {loading, terms: { postId }, results, totalCount, currentUser} = props;
  
  if (loading) {
  
    return <div className="posts-comments-thread"><Components.Loading/></div>
  
  } else {
    
    const resultsClone = _.map(results, _.clone); // we don't want to modify the objects we got from props
    const nestedComments = Utils.unflatten(resultsClone, {idProperty: '_id', parentIdProperty: 'parentCommentId'});

    return (
      <div className="posts-comments-thread">
        <h5 className="posts-comments-thread-title"><FormattedMessage id="comments.comments"/></h5>
        <Components.CommentsList currentUser={currentUser} comments={nestedComments} commentCount={totalCount}/>
        {!!currentUser ?
          <div className="post" style={{ padding: '12px auto 12px 20px' }}>
            <h5 style={{ padding: '10px 10px 0 20px' }}><FormattedMessage id="comments.new"/></h5>
            <Components.CommentsNewForm
              postId={postId} 
              type="comment"
            />
          </div> :
          <div>
            <Components.ModalTrigger size="small" component={<a href="#"><FormattedMessage id="comments.please_log_in"/></a>}>
              <Components.AccountsLoginForm/>
            </Components.ModalTrigger>
          </div> 
        }
      </div>
    );
  }
};

PostsCommentsThread.displayName = 'PostsCommentsThread';

PostsCommentsThread.propTypes = {
  currentUser: PropTypes.object
};

const options = {
  collection: Comments,
  queryName: 'commentsListQuery',
  fragmentName: 'CommentsList',
  limit: 0,
};

registerComponent('PostsCommentsThread', PostsCommentsThread, [withList, options], withCurrentUser);
