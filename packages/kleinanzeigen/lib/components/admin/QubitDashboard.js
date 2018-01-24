import React from 'react';

import { Col, Container, Row } from 'reactstrap'

import { Components, registerComponent } from 'meteor/vulcan:core';

// import withGATracker from './../hoc/withGATracker';

const QubitDashboard = (props) => {
  // const { document: room, documentId, loading, currentUser } = props;
  // const terms = _.isEmpty(props.location && props.location.query) ? { view: 'new' }: props.location.query;
  return (
    <div>
      <Container style={{ padding: '30px 0' }}>
        <Row>
          {/* <Col lg={12} md={12} sm={12} xs={12}>
            <Components.CompaniesTypesNewForm />
            <Components.CompaniesTypesListFilter />
          </Col> */}
          <Col lg={5} md={5} sm={12} xs={12}>
            <Components.CompaniesTypesListFilter />
          </Col>
          <Col lg={7} md={7} sm={12} xs={12}>
            <Components.CompaniesTypesNewForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

QubitDashboard.displayName = 'QubitDashboard';

// const options = {
//   collection: Listings
// };
//
// const mapPropsFunction = props => ({...props, documentId: props.routeParams && props.routeParams.roomId});
//

// addAdminColumn({
//   name: 'users.posts',
//   order: 50,
//   component: QubitDashboard
// });

registerComponent('QubitDashboard', QubitDashboard);
// registerComponent('QubitDashboard', QubitDashboard, mapProps(mapPropsFunction), [withDocument, options], withCurrentUser);
