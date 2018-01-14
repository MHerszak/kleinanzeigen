import React from 'react';

import { Col, Container, Row } from 'reactstrap'

import { Components, registerComponent } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

const JobsAdd = (props, context) => {
  return (
    <div>
      <Components.SubHeaderJobs />
      <Container style={{ padding: '20px 0' }}>
        <Row>
          <Col lg={9} md={9} sm={9} xs={9}>
            <Components.JobsNewForm />
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

JobsAdd.displayName = "JobsAdd";

registerComponent('JobsAdd', withGATracker(JobsAdd));
