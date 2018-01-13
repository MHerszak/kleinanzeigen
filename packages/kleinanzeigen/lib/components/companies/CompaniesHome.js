import React from 'react';

import { Col, Container, Row } from 'reactstrap'

// import mapProps from 'recompose/mapProps';

import { Components, registerComponent, withCurrentUser, withDocument } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

// import { Companies } from '../../modules/companies/index';

const CompaniesHome = (props) => {
  // const { document: room, documentId, loading, currentUser } = props;
  const terms = _.isEmpty(props.location && props.location.query) ? { view: 'new' }: props.location.query;
  return (
    <div>
      <Components.SubHeader noFilter collection="companies" />
      <Container style={{ padding: '30px 0' }}>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <Components.CompaniesList terms={terms} />
          </Col>
          {/* <div className="col-lg-4 col-md-4">
            <div className="sidebarblock">
              <Components.ListingCard className="listing sponsord" terms={terms} />
            </div>
          </div> */}
        </Row>
      </Container>
    </div>
  );
};

CompaniesHome.displayName = 'CompaniesHome';

// const options = {
//   collection: Listings
// };
//
// const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.roomId});
//

registerComponent('CompaniesHome', withGATracker(CompaniesHome));
// registerComponent('CompaniesHome', CompaniesHome, mapProps(mapPropsFunction), [withDocument, options], withCurrentUser);
