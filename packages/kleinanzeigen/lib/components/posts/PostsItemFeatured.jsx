import { Components, registerComponent, Utils } from 'meteor/vulcan:core';

import React, { PureComponent } from 'react';

import moment from 'moment';

import { Link } from 'react-router';

import PropTypes from 'prop-types';

import { Card, CardImg, CardText, CardSubtitle, CardFooter, CardBody, CardDeck } from 'reactstrap';

// import classNames from 'classnames';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Posts } from '../../modules';

class PostsItemFeatured extends PureComponent {

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

  // renderActions = () => {
  //   return (
  //     <div className="posts-actions">
  //       <Components.ModalTrigger
  //         title="Edit Post"
  //         component={
  //           <a className="posts-action-edit">
  //             <FormattedMessage id="posts.edit" />
  //           </a>}>
  //         <Components.PostsEditForm post={this.props.post} />
  //       </Components.ModalTrigger>
  //     </div>
  //   )
  // };

  // renderAvatar = () => {
  //   const { post } = this.props;
  //   return (
  //     <div className="avatar" style={{ marginRight: 12 }}>
  //       {post.user && <Components.Avatar size={37} user={post.user} />}
  //       <div className="status green">&nbsp;</div>
  //     </div>
  //   );
  // };

  // renderPostBody = () => {
  //   const { post } = this.props;
  //   const postTextClass = classNames('posttext pull-left', {
  //     'full-width': !this.state.imageAvailable,
  //     'with-image': this.state.imageAvailable
  //   });

  //   return (
  //     <div className={postTextClass}>
  //       <h6 className="posts-item-title">
  //         <Link to={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
  //           <span className="featured">{post.title}</span>
  //         </Link>
  //         {post.sponsored && <Link to={'/sponsor'} className="posts-sponsored-marker">Sponsored</Link>}
  //         {post.featured && <Link to={Posts.getLink(post)} className="posts-featured-marker">Featured</Link>}
  //       </h6>
  //       <p className="posts-item-body">
  //         {!!post.excerpt && <span className="posts-item-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt}}/>}
  //         <span className="posts-item-domain">{post.url && `– ${Utils.getDomain(post.url)}`}</span>
  //       </p>
  //       {/*{this.renderCategories()}*/}
  //     </div>
  //   );
  // };

  renderPostHeadline = () => {
    const { post } = this.props;
    return (
      <Link to={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
        <span className="featured">{post.title}</span>
      </Link>
    );
  };

  renderThumbnail = () => {
    const { post } = this.props;
    if (post.thumbnailUrl && this.state.imageAvailable) {
      return (
        <Components.PostsThumbnail
          onError={this.onImageLoadError}
          post={post}
          size="medium"
        />
      );
    }
  };

  // renderIcons = () => {
  //   const { post, currentUser } = this.props;
  //   return (
  //     <div className="icons">
  //       {/*<Components.Icon name="flag" /><Components.Icon name="map" />*/}
  //       <div className="posts-item-vote">
  //         <Components.Vote collection={Posts} document={post} currentUser={currentUser} />
  //       </div>
  //     </div>
  //   );
  // };

  // renderPostInfo = () => {
  //   const { post, currentUser } = this.props;
  //   return (
  //     <div className="postinfobot">

  //       <div className="prev pull-left" style={{ display: 'flex' }}>
  //         {Posts.options.mutations.edit.check(currentUser, post) && this.renderActions()}
  //         {this.props.currentUser && this.props.currentUser.isAdmin && <Components.PostsStats post={post} />}
  //       </div>

  //       <div className="posted pull-right">
  //         {/*<Components.Icon name="clock-o" />*/}
  //         {post.postedAt ? `Posted: ${moment(new Date(post.postedAt)).fromNow()}` : <FormattedMessage id="posts.dateNotDefined"/>}
  //       </div>

  //       <div className="next pull-right">
  //         {this.renderCommenters()}
  //         {/*<a href="#"><i className="fa fa-share"></i></a>

  //           <a href="#"><i className="fa fa-flag"></i></a>*/}
  //       </div>

  //       <div className="clearfix"></div>
  //     </div>
  //   );
  // };

  // renderUserInfo = () => (
  //   <div className="userinfo pull-left">
  //     {this.renderAvatar()}
  //     {/* {this.renderIcons()} */}
  //   </div>
  // );

  renderCardItem = () => {
    const { post } = this.props;
    return (
      <div className="featured-card">
        <Card>
          {post.thumbnailUrl ?
            <CardImg height="90px" top src={post.thumbnailUrl} alt="Card image cap" /> :
            <CardImg height="90px" top src="https://specials-images.forbesimg.com/imageserve/712848085/200x0.jpg?fit=scale" alt="Card image cap" />}
          <CardBody>
            <CardSubtitle
              tag={Link}
              target={Posts.getLinkTarget(post)}
              href={Posts.getLink(post, false, false)}
            >
              {post.title}
            </CardSubtitle>
            <CardText>
              <small className="text-muted">
                {post.postedAt ? `Posted: ${moment(new Date(post.postedAt)).fromNow()}` : <FormattedMessage id="posts.dateNotDefined"/>}
              </small>
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  render() {
    const { className } = this.props;
    // const postClass = classNames(
    //   `${className}`, {
    //     'posts-sponsored': !!post.sponsored,
    //     'posts-pending': post.status === Posts.config.STATUS_PENDING,
    //     'posts-sticky': post.sticky,
    //     'posts-featured': post.featured,
    //   }
    // );
    // console.log(post.featured);
    return (
      <div className={className}>
        {this.renderCardItem()}
      </div>
    );
    // return (
    //   <div className={className}>
    //     <div className="topwrap">
    //       {/* {this.renderUserInfo()} */}
    //       {/* {this.renderPostBody()} */}
    //       {this.renderPostHeadline()}
    //       {this.renderThumbnail()}
    //     </div>
    //   </div>
    // );
  }
}

PostsItemFeatured.propTypes = {
  currentUser: PropTypes.object,
  post: PropTypes.object.isRequired,
  terms: PropTypes.object,
};

registerComponent('PostsItemFeatured', PostsItemFeatured);
