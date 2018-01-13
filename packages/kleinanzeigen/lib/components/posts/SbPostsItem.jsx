import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'react-bootstrap/lib/Tooltip';
// import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import classNames from 'classnames';
import { Link } from 'react-router';
import moment from 'moment';
import { Posts } from "./../../modules";
import { Components, replaceComponent, getRawComponent, Utils } from 'meteor/vulcan:core';
import Users from "meteor/vulcan:users";
// import SbShare from './SbShare.jsx';
// import SbPostsThumbnail from './SbPostsThumbnail.jsx';
// import SbPostsActions from './SbPostsActions.jsx';

const OverlayTrigger = ({ id, component, content }) => (
  <Components.Tooltip
    placement="bottom"
    id={id}
    component={component}
    content={content}
  />
);

const Marker = ({post}) => {

  let status;
  const statuses = {
    candidate: 'Unpaid',
    'sponsored-pending': 'Paid, pending review',
    sponsored: `Scheduled for ${moment(post.postedAt).format('YYYY/MM/DD')}`,
    featured: `Featured on ${moment(post.postedAt).format('YYYY/MM/DD')}`
  };

  if (post.sponsoredCandidate) {
    status = 'candidate';
  } else if (post.sponsored) {
    if (post.status === Posts.config.STATUS_APPROVED) {
      status = 'sponsored';
    } else {
      status = 'sponsored-pending';
    }
  } else if (post.status === Posts.config.STATUS_APPROVED) {
    status = 'featured';
  } else {
    return null;
  }

  return (
    <div className={classNames('posts-item-status', `status-${status}`)}>
      <OverlayTrigger
        component={<Components.Icon name={status}/>}
        content={<div>{statuses[status]}</div>}
      />
    </div>
  )
};


class SbPostsItem extends getRawComponent('PostsItem') {

  render() {

    const post = this.props.post;

    const postClass = classNames(
      "posts-item",
      {"posts-sponsored": !!post.sponsored},
      {'posts-pending': post.status === Posts.config.STATUS_PENDING}
    );

    const tooltip = (
      <OverlayTrigger
        id="posts-item-user"
        component={
          <div className="posts-item-user">
            <Components.UsersAvatar user={post.user} size={37} />
          </div>}
        content={
          <div>Submitted by {Users.getDisplayName(post.user)}
          {post.postedAt && <span><br/>{moment(post.postedAt || post.createdAt).fromNow()}</span>}</div>}
      />
    );

    return (
      <div className={postClass}>

        {this.props.index === 0 ? <Components.SbPostsThumbnail post={post} size="medium"/> : null}

        <div className="posts-item-content">

          <Marker post={post}/>

          <div className="posts-item-header">

            <div className="posts-item-title-wrapper">
              <h3 className="posts-item-title">
                <Link className="posts-item-title-link" to={Posts.getLink(post)} rel="noopener" target={Posts.getLinkTarget(post)}>{post.title}</Link>
                {post.sponsored || post.sponsoredCandidate && <Link to={"/sponsor"} className="posts-sponsored-marker">Sponsored</Link>}
                {post.sponsored || post.sponsoredCandidate && <Link to={"/sponsor"} className="posts-sponsored-marker">Sponsored</Link>}
              </h3>
              <span className="spacer"> </span>
            </div>

          </div>

          <div className="posts-item-body">
            {!!post.excerpt ? <span className="posts-item-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}}/> : null }
            <span className="posts-item-domain">– {Utils.getDomain(post.url)}</span>
          </div>

          <div className="posts-item-footer">

            {post.user && tooltip}

            {post.categories && post.categories.length > 0 && <Components.PostsCategories post={this.props.post} currentUser={this.props.currentUser} />}

            <Components.SbShare post={post} currentUser={this.props.currentUser} />

            {this.props.currentUser && <Components.SbPostsActions post={post} currentUser={this.props.currentUser} />}
          
          </div>

          {post.sponsoredCandidate && <div className="posts-item-pay"><Link to={`/sponsor/pay/${post._id}`} className="btn btn-primary">Complete Payment</Link></div>}

        </div>

      </div>
    );
  }
}

SbPostsItem.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  showThumbnail: PropTypes.bool,
  showDate: PropTypes.bool
};

SbPostsItem.contextTypes = {
  currentUser: PropTypes.object
};

SbPostsItem.defaultProps = {
  showThumbnail: true,
  showDate: true
};

replaceComponent('PostsItem', SbPostsItem);
