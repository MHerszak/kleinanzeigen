import React from 'react';

import { Col, Container, Row } from 'reactstrap'

import { Components, registerComponent } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

const JobsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? { view: 'new' }: props.location.query;
  return (
    <div>
      <Components.SubHeader noFilter collection="jobs" />
      <Container style={{ padding: '20px 0' }}>
        <Row>
          <Col lg={9} md={9} sm={9} xs={9}>
            <Components.JobsList terms={terms} />
          </Col>
          <Col lg={3} md={3} sm={3} xs={3}>
            <div className="sidebarblock">
              <p>List of Companies</p>
              <Components.CompaniesList minimum terms={{ view: 'new' }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

JobsHome.displayName = "JobsHome";

registerComponent('JobsHome', withGATracker(JobsHome));
