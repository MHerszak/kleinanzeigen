import React from 'react';

import { Col, Container, Row } from 'reactstrap';

import { isMobile } from 'react-device-detect';

import { Components, registerComponent } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

const PostsHome = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? { view: 'new' }: props.location.query;
  return (
    <div>
      {!isMobile && <Components.SubHeader />}
      {!isMobile && <div
        style={{ backgroundColor: '#222' }}
        // style={{ backgroundColor: '#222' background: '-webkit-linear-gradient(top, #222 0%,#202020 50%,#222 100%)' }}
      >
        <Container style={{ padding: '10px 0' }}>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <h6>Featured</h6>
              <Components.PostsFeatured />
            </Col>
          </Row>
        </Container>
      </div>}
      <Container style={{ padding: '20px 0' }}>
        <Row>
          <Col lg={9} md={9} sm={12} xs={12}>
            <Components.Newsletter />
            <Components.PostsList terms={terms} />
          </Col>
          <Col lg={3} md={3} sm={12} xs={12} style={{ padding: `${isMobile && '20px 0'}` }}>
            <div className="sidebarblock">
              <p>STORY FILTER</p>
              <Components.Filters />
              <p>ON THE JOB BOARD</p>
              <Components.JobsList minimum terms={{ view: 'new' }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

PostsHome.displayName = "PostsHome";

registerComponent('PostsHome', withGATracker(PostsHome));
