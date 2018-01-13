import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { registerComponent } from 'meteor/vulcan:core';

import { Posts } from './../../modules';

const propTypes = {
  size: PropTypes.string,
};

const defaultProps = {
  size: 'medium'
};

class SbPostsThumbnail extends Component {

  static propTypes = propTypes;

  static defaultProps = defaultProps;

  onError = (e) => {
    const { onError } = this.props;
    return onError(e);
  };

  render() {
    const { post, clickHandler, size } = this.props;
    const pseudoRandomIndex = post.postedAt && post.postedAt.getTime ? [1,2,3,4,1,2,3,4,1,2][post.postedAt.getTime().toString().slice(-1)] : 1;
    const thumbnailClass = classNames('posts-thumbnail', 'v'+pseudoRandomIndex);
    const cloudinaryUrl = post.cloudinaryUrls && _.findWhere(post.cloudinaryUrls, { name: size });
    const thumbnailUrl = cloudinaryUrl && cloudinaryUrl.url;
    return (
      <a onClick={clickHandler} className={thumbnailClass} href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
        {thumbnailUrl && <img src={thumbnailUrl} onError={(e) => this.onError(e)} />}
      </a>
    );
  }
}

// const SbPostsThumbnail = (props) => {
//   const { post, clickHandler, size, onImageLoadError } = props;
//   const pseudoRandomIndex = post.postedAt && post.postedAt.getTime ? [1,2,3,4,1,2,3,4,1,2][post.postedAt.getTime().toString().slice(-1)] : 1;
//   const thumbnailClass = classNames('posts-thumbnail', 'v'+pseudoRandomIndex);
//   const cloudinaryUrl = post.cloudinaryUrls && _.findWhere(post.cloudinaryUrls, { name: size });
//   const thumbnailUrl = cloudinaryUrl && cloudinaryUrl.url;
//
//   return (
//     <a onClick={clickHandler} className={thumbnailClass} href={Posts.getLink(post)} target={Posts.getLinkTarget(post)}>
//       {post.thumbnailUrl && <img src={thumbnailUrl} onError={onImageLoadError} />}
//     </a>
//   )
// };

// SbPostsThumbnail.defaultProps = {
//   size: "medium"
// };

registerComponent('PostsThumbnail', SbPostsThumbnail);

// module.exports = SbPostsThumbnail;
// export default SbPostsThumbnail;