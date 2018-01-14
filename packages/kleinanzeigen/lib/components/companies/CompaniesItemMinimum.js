import React from 'react';

import { Link } from 'react-router';

import { Components, registerComponent } from 'meteor/vulcan:core';

// import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

const CompaniesItemMinimum = ({ document, currentUser }) => {
  // console.log(document);
  const renderPlace = () => (
    <small className="companie-item-icon">
      <Components.Icon name="globe" /> {document.place.name},
    </small>
  )
  return (
    <div className="companie-item">
      <div className="companie-item-info">
        <Link
          to={Companies.getLink(document)}
          target={Companies.getLinkTarget(document)}
        >
          <p className="companie-item-name">{document.name}</p>
        </Link>
        {document.place.name && renderPlace()}
        <small className="companie-item-type">{`Type: ${document.type}`}</small>
      </div>
    </div>
  );
};

registerComponent('CompaniesItemMinimum', CompaniesItemMinimum);