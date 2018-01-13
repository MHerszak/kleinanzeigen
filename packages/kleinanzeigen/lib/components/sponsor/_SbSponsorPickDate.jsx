import React from 'react';

import { withRouter } from 'react-router';

import mapProps from 'recompose/mapProps';

import { registerComponent, Components, withDocument } from 'meteor/vulcan:core';

import { Posts } from './../../modules';

// import SponsorProgress from './SbSponsorProgress.jsx';
// import SponsorPreview from './SbSponsorPreview.jsx';
// import SponsorDates from './SbSponsorDates.jsx';

const SbSponsorPickDate = ({ router, routeParams, loading, document }) => (
  <div className="page sponsor-page">
    <h2 className="page-title">Pick Date</h2>
    <div className="page-contents">
      {loading ? <Components.Loading/> :
        <div>
          <Components.SponsorProgress step="date"/>

          <Components.SponsorPreview post={document} />

          <Components.SponsorDates post={document} router={router}/>

        </div>
      }
    </div>
  </div>
);

const options = {
  collection: Posts,
  fragmentName: 'PostsPage'
};

const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.postId});

registerComponent('SponsorPickDate', SbSponsorPickDate, withRouter, mapProps(mapPropsFunction), [withDocument, options] );
