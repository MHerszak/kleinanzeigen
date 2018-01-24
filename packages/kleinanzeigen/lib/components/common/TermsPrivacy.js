import React from 'react';

import { Col, Container, Row } from 'reactstrap';

// import { isMobile } from 'react-device-detect';

import { Components, registerComponent } from 'meteor/vulcan:core';

import withGATracker from './../hoc/withGATracker';

const TermsPrivacy = (props, context) => {
  const terms = _.isEmpty(props.location && props.location.query) ? { view: 'new' }: props.location.query;
  return (
    <div>
      <Container style={{ padding: '20px 0' }}>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
          <h3>Terms of Service ("Terms")</h3>
          <p>Last updated: (January 22. 2018)</p>
          <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the
          https://qubitfy.com/ website operated by Base2Industries.</p>
          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with
          these Terms. These Terms apply to all visitors, users and others who access or use the Service.
          By accessing or using the Service you agree to be bound by these Terms. If you disagree
          with any part of the terms then you may not access the Service.</p>
          <h4>Termination</h4>
          <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for
          any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p>All provisions of the Terms which by their nature should survive termination shall survive
          termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and
          limitations of liability.</p>
          {/* Subscriptions
          <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in
          advance on a recurring ...
          The Subscriptions section is for SaaS businesses. For the full disclosure section or for a
          “Purchases” section, create your own Terms of Service.</p> */}
          <h4>Content</h4>
          <p>Our Service allows you to post, link, store, share and otherwise make available certain information,
          text, graphics, videos, or other material ("Content").
          The Content section is for businesses that allow users to create, edit, share, make content on
          their websites or apps. For the full disclosure section, create your own Terms of Service.</p>
          <h4>Links To Other Web Sites</h4>
          <p>Our Service may contain links to third-party web sites or services that are not owned or controlled
          by Qubify.</p>
          <p>Qubify has no control over, and assumes no responsibility for, the content,
          privacy policies, or practices of any third party web sites or services. You further acknowledge and
          agree that Base2Industries shall not be responsible or liable, directly or indirectly, for any
          damage or loss caused or alleged to be caused by or in connection with use of or reliance on any
          such content, goods or services available on or through any such web sites or services.</p>
          <h4>Changes</h4>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
          revision is material we will try to provide at least 30 days' notice prior to any new terms
          taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>Contact Us If you have any questions about these Terms, please contact us.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

TermsPrivacy.displayName = "TermsPrivacy";

registerComponent('TermsPrivacy', withGATracker(TermsPrivacy));
