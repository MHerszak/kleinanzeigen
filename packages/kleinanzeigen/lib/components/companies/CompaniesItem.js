import React from 'react';

import { Link } from 'react-router';

import { Card, CardText, CardBody,
  CardTitle, CardLink } from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

// import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

const CompaniesItem = ({ document, currentUser }) => {
  const renderPlace = () => (
    <p className="companie-item-icon">
      <Components.Icon name="globe" /> {document.place.name}
    </p>
  )
  return (
    <div>
      <Card className="companies-listing">
        <CardBody>
          <CardTitle tag="h5">{document.name}</CardTitle>
          <CardText>
            <small>Type of business: {document.type}</small>
          </CardText>
          <CardText>{document.description}</CardText>
          <CardText>{document.place.name && renderPlace()}</CardText>
          <CardLink
            tag={Link}
            target={Companies.getLinkTarget(document)}
            href={Companies.getLink(document, false, false)}
          >
            Go to page
          </CardLink>
        </CardBody>
      </Card>
    </div>
  );
}

registerComponent('CompaniesItem', CompaniesItem);