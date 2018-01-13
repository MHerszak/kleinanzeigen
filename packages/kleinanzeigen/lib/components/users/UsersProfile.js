import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

import mapProps from 'recompose/mapProps';

import classNames from 'classnames';

import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import Users from 'meteor/vulcan:users';

import { Components, registerComponent, withDocument, withCurrentUser } from 'meteor/vulcan:core';

const UserProfileCard = (props) => {
  const htmlBody = { __html: props.user.htmlBio };
  return (
    <div>
      <Card className="testimonial-card">
        <CardImg
          top
          width="100%"
          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
          alt="Card image cap"
          className="indigo lighten-1"
        />
        <Components.Avatar size={props.avatarSize} user={props.user} />
        <CardBody>
          <CardTitle>
            {Users.getDisplayName(props.user)}
          </CardTitle>
          <div className="mv">
            <Components.Icon name="quote-left" />
            <div dangerouslySetInnerHTML={htmlBody}></div>
          </div>
          {/*<CardSubtitle>
            <Components.Icon name="quote-left">
              <div dangerouslySetInnerHTML={htmlBody}></div>
            </Components.Icon>
          </CardSubtitle>*/}
          {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>*/}
        </CardBody>
      </Card>
    </div>
  );
};

const AboutCard = (props) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">
          About
          {props.currentUser && Users.owns(props.currentUser, props.document) &&
        <Link to={Users.getEditUrl(props.document)}><FormattedMessage id="users.edit_account" /></Link>}
        </CardTitle>
        <CardText tag="div">
          <div className="mv">
            <Components.Icon name="user-circle-o" />
            {Users.getDisplayName(props.document)}
          </div>
          <div className="mv">
            {props.document.twitterUsername &&
            <span>
              <Components.Icon name="twitter"/>
              <a className="users-profile-twitter" href={"http://twitter.com/" + props.document.twitterUsername} target="_blank">
                {Users.getTwitterName(props.document)}
              </a>
            </span>}
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
};

const propTypes = {
  document: PropTypes.object,
  currentUser: PropTypes.object
};

class SbUsersProfile extends Component {

  static displayName = 'UserProfile';

  static propTypes = propTypes;

  static defaultProps = {
    params: {},
    document: {},
  };

  state = {
    activeTab: 'links'
  };

  toggleTab = (tab) => {
    this.setState({
      activeTab: tab
    });
  };

  render() {
    const { loading, documentId, slug, currentUser, document, routes, params } = this.props;
    if (loading) {
      return <div className="page users-profile">
        <Components.Loading />
      </div>
    } else if (!document) {
      console.log(`// missing user (_id/slug: ${documentId || slug})`);
      return <div className="page users-profile">
        <FormattedMessage id="app.404" />
      </div>
    } else {
      const user = document;
      const userPostsTerms = Users.isAdmin(currentUser) || Users.owns(currentUser, document) ?
        { view: "allUserPosts", userId: user._id } : { view: "userPosts", userId: user._id };
      const classname = classNames({
        'posts-list-user-posts': this.state.activeTab === 'links',
        'posts-list-upvoted-posts': this.state.activeTab === 'likes',
        'posts-list-own-profile': currentUser && Users.owns(currentUser, user),
      });
      return (
        <div className="page users-profile">
          <Components.HeadTags url={Users.getProfileUrl(user, true)} title={Users.getDisplayName(user)} />
          <section className="content">
            {/*<div className="container">
              <div className="row">
                <Components.Breadcrumbs routes={routes} params={params} />
              </div>
            </div>*/}
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <UserProfileCard avatarSize={120} user={user} />
                  <AboutCard currentUser={currentUser} document={user} />
                </div>
                <div className="col-8">
                  <Components.PostsFeed className={classname} terms={userPostsTerms} />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}

const options = {
  collection: Users,
  // queryName: 'usersSingleQuery',
  fragmentName: 'UsersProfile',
};

const mapPropsFunction = (props) => {
  const { routeParams = {}, userId, slug } = props;
  if (routeParams) {
    console.log(routeParams);
    return ({
      // ...props,
      params: props.routeParams,
      routes: props.routes,
      userId,
      slug,
    });
  }
};

registerComponent('UsersProfile', SbUsersProfile, mapProps(mapPropsFunction), withCurrentUser, [withDocument, options]);
