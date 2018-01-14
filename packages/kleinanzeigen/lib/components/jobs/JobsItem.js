import { Components, registerComponent, Utils } from 'meteor/vulcan:core';

import React, { PureComponent } from 'react';

import moment from 'moment';

import { Link } from 'react-router';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Jobs } from '../../modules';

class JobsItem extends PureComponent {

  state = {
    imageAvailable: true,
  };

  // componentDidMount() {
  //   const { post } = this.props;
  //   const img = new Image();
  //   img.onerror = () => {
  //     this.onImageLoadError();
  //   };
  //   img.src = post.thumbnailUrl;
  // }

  // onImageLoadError = () => {
  //   this.setState({ imageAvailable: false });
  // };

  // renderCategories = () => {
  //   const { post } = this.props;
  //   return post.categories && post.categories.length > 0 ? <Components.PostsCategories post={this.props.post} /> : "";
  // };

  // renderCommenters = () => {
  //   const { post } = this.props;
  //   return post.commenters && post.commenters.length > 0 ? <Components.PostsCommenters post={this.props.post} /> : "";
  // };

  renderActions = () => {
    return (
      <div className="posts-actions">
        <Components.ModalTrigger
          title="Edit Job"
          component={
            <a className="posts-action-edit">
              <FormattedMessage id="posts.edit" />
            </a>}>
          <Components.PostsEditForm post={this.props.document} />
        </Components.ModalTrigger>
      </div>
    )
  };

  // renderAvatar = () => {
  //   const { post } = this.props;
  //   return (
  //     <div className="avatar">
  //       {post.user && <Components.Avatar size={37} user={post.user} />}
  //       <div className="status green">&nbsp;</div>
  //     </div>
  //   );
  // };

  renderJobBody = () => {
    const { document } = this.props;
    return (
      <div className="jobs-item">
        <h6 className="posts-item-title">
          <Link to={Jobs.getLink(document)} target={Jobs.getLinkTarget(document)}>
            {document.name}
          </Link>
          <small className="posted pull-right">
            {/*<Components.Icon name="clock-o" />*/}
            {document.createdAt ? `Posted: ${moment(new Date(document.createdAt)).fromNow()}` : <FormattedMessage id="jobs.dateNotDefined"/>}
          </small>
          {document.sponsored && <Link to={'/sponsor'} className="posts-sponsored-marker">Sponsored</Link>}
          {document.featured && <Link to={Jobs.getLink(document)} className="posts-featured-marker">Featured</Link>}
        </h6>
        <p className="posts-item-body">
          {!!document.description && <span className="posts-item-excerpt" dangerouslySetInnerHTML={{ __html: document.description }} />}
          <span className="posts-item-domain">{document.url && `– ${Utils.getDomain(document.url)}`}</span>
        </p>
        {document.companyName && <p className="jobs-item-company">
          <small className="posts-item-domain">{document.companyName}</small>
        </p>}
      </div>
    );
  };

  // renderThumbnail = () => {
  //   const { post } = this.props;
  //   if (post.thumbnailUrl && this.state.imageAvailable) {
  //     return (
  //       <Components.PostsThumbnail
  //         onError={this.onImageLoadError}
  //         post={post}
  //         size="medium"
  //       />
  //     );
  //   }
  // };

  // renderIcons = () => {
  //   const { document, currentUser } = this.props;
  //   return (
  //     <div className="icons">
  //       {/*<Components.Icon name="flag" /><Components.Icon name="map" />*/}
  //       <div className="posts-item-vote">
  //         <Components.Vote collection={Jobs} document={document} currentUser={currentUser} />
  //       </div>
  //     </div>
  //   );
  // };

  renderPostInfo = () => {
    const { document, currentUser } = this.props;
    return (
      <div className="prev pull-left" style={{ display: 'flex' }}>
        {Jobs.options.mutations.edit.check(currentUser, document) && this.renderActions()}
        {this.props.currentUser && this.props.currentUser.isAdmin && <Components.PostsStats post={document} />}
      </div>
    );
  };

  // renderUserInfo = () => (
  //   <div className="userinfo pull-left">
  //     {this.renderAvatar()}

  //     {this.renderIcons()}
  //   </div>
  // );

  render() {
    const { document, className } = this.props;
    const post = document;
    console.log('document => ', document);
    const postClass = classNames(
      `${className}`, {
        'posts-sponsored': !!post.sponsored,
        'posts-sticky': post.sticky,
        'posts-featured': post.featured,
      }
    );
    return (
      <div className={postClass}>
        <div className="topwrap">
          {this.renderJobBody()}
        </div>
        <div className="clearfix"></div>
        {this.renderPostInfo()}
      </div>
    );
  }
}

JobsItem.propTypes = {
  currentUser: PropTypes.object,
  document: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('JobsItem', JobsItem);
