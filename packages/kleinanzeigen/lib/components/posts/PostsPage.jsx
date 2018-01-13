import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { Components, registerComponent, withDocument, withCurrentUser, getActions, withMutation } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Posts } from '../../modules/posts/index.js';

// const Breadcrumbs = ({ title }) => {
//   return (
//     <div className="col-lg-8 breadcrumbf">
//       <a href="#">{title}</a>
//       <span className="diviver">&gt;</span>
//       <a href="#">General Discussion</a> ...
//     </div>
//   )
// };
//
// registerComponent('Breadcumbs', Breadcrumbs);

class PostsPage extends Component {

  // triggered after the component did mount on the client
  async componentDidMount() {
    try {

      // destructure the relevant props
      const {
        // from the parent component, used in withDocument, GraphQL HOC
        documentId,
        // from connect, Redux HOC
        setViewed,
        postsViewed,
        // from withMutation, GraphQL HOC
        increasePostViewCount,
      } = this.props;

      // a post id has been found & it's has not been seen yet on this client session
      if (documentId && !postsViewed.includes(documentId)) {

        // trigger the asynchronous mutation with postId as an argument
        await increasePostViewCount({postId: documentId});

        // once the mutation is done, update the redux store
        setViewed(documentId);
      }

    } catch(error) {
      console.log(error); // eslint-disable-line
    }
  }
  
  render() {
    const { loading, document, documentId, currentUser } = this.props;

    if (loading) {
      return (
        <div className="posts-page"><Components.Loading/></div>
      );
      
    } else if (!document) {
      
      console.log(`// missing post (_id: ${documentId})`);
      return (
        <div className="posts-page"><FormattedMessage id="app.404"/></div>
      );

    } else {
      const post = document;

      // const htmlBody = {__html: post.htmlBody};

      return (
        <div className="posts-page">

          <Components.HeadTags url={Posts.getPageUrl(post, true)} title={post.title} image={post.thumbnailUrl} description={post.excerpt} />

          <section className="content">

            {/*<div className="container">
              <div className="row">
                <Components.Breadcrumbs title={post.title} />
              </div>
            </div>*/}

            <div className="container">
              <div className="row">
                {/*<div className="col-lg-7">
                  <Components.GoogleMap isMarkerShown />
                </div>*/}
                <div className="col-lg-12">
                  <Components.PostsItem post={post} currentUser={currentUser} className="post" />
                  <Components.PostsCommentsThread terms={{ postId: post._id, view: 'postComments' }} />
                </div>
                {/*{post.htmlBody ? <div className="posts-page-body" dangerouslySetInnerHTML={htmlBody}></div> : null}*/}
              </div>
              {/*<div className="row">
                <div className="col-lg-8">
                  <Components.PostsCommentsThread terms={{ postId: post._id, view: 'postComments' }} />
                </div>
              </div>*/}
            </div>
          </section>

        </div> 
      );
      
    }
  }
}

PostsPage.displayName = "PostsPage";

PostsPage.propTypes = {
  documentId: PropTypes.string,
  document: PropTypes.object,
  postsViewed: PropTypes.array,
  setViewed: PropTypes.func,
  increasePostViewCount: PropTypes.func,
};

const queryOptions = {
  collection: Posts,
  queryName: 'postsSingleQuery',
  fragmentName: 'PostsPage',
};

const mutationOptions = {
  name: 'increasePostViewCount',
  args: {postId: 'String'},
};

const mapStateToProps = state => ({ postsViewed: state.postsViewed });
const mapDispatchToProps = dispatch => bindActionCreators(getActions().postsViewed, dispatch);

registerComponent(
  // component name used by Vulcan
  'PostsPage', 
  // React component 
  PostsPage,
  // HOC to give access to the current user
  withCurrentUser, 
  // HOC to load the data of the document, based on queryOptions & a documentId props
  [withDocument, queryOptions], 
  // HOC to provide a single mutation, based on mutationOptions
  withMutation(mutationOptions), 
  // HOC to give access to the redux store & related actions
  connect(mapStateToProps, mapDispatchToProps)
);
