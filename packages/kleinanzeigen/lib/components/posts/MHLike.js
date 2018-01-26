import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import Tooltip from 'react-bootstrap/lib/Tooltip';
// import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import { Components, getRawComponent, withMessages, registerComponent } from 'meteor/vulcan:core';
import { withVote, hasUpvoted } from 'meteor/vulcan:voting';

const OverlayTrigger = ({ id, component, content }) => (
    <Components.Tooltip
        placement="bottom"
        id={id}
        target={id}
        component={component}
        content={content}
    />
);

class SbLike extends getRawComponent('Vote') {

    renderLoggedOutIcon = () => {
        const content = (
            <a className="like-button" href="javascript:void(0)">
                <Components.Icon name="like" />
            </a>
        );
        return (
            <OverlayTrigger
                id="renderLoggedOutIcon"
                component={<div>Add to My Likes</div>}
                content={content}
            />
        );
    }

    renderLikeIcon = () => {
        const content = (
            <a className="like-button" href="javascript:void(0)" onClick={this.upvote}>
                <Components.Icon name="like" />
            </a>
        );
        return (
            <OverlayTrigger
                id="renderLikeIcon"
                component={<div>Add to My Likes</div>}
                content={content}
            />
        );
    }

    renderLikedIcon = () => {
        const content = (
            <a className="like-button" href="javascript:void(0)" onClick={this.upvote}>
                <Components.Icon name="liked" />
            </a>
        );
        return (
            <OverlayTrigger
                id="renderLikedIcon"
                component={<div>Remove from My Likes</div>}
                content={content}
            />
        );
    }

  render() {

    const loggedOutIcon = this.renderLoggedOutIcon()

    const likeIcon = this.renderLikeIcon();
    
    const likedIcon = this.renderLikedIcon();

    return (
      <div className={`like ${this.getActionClass()}`}>
        {this.props.currentUser ?
          (hasUpvoted(this.props.currentUser, this.props.document) ? likedIcon : likeIcon) : 
          <Components.ModalTrigger size="small" title="Please Log In" component={loggedOutIcon}>
            <div className="log-in-message">
              <Components.AccountsLoginForm/>
            </div>
          </Components.ModalTrigger>
        }
      </div>
    );
  }
}

registerComponent('MHLike', SbLike, withMessages, withVote);
