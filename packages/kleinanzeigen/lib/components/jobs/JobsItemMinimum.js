import React from 'react';

import { Link } from 'react-router';

import { Components, registerComponent } from 'meteor/vulcan:core';

// import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Jobs } from '../../modules/jobs/index';

const JobsItemMinimum = ({ document, currentUser }) => {
  // console.log(document);
  // const renderPlace = () => (
  //   <small className="jobs-item-icon">
  //     <Components.Icon name="globe" /> {document.place.name},
  //   </small>
  // )
  return (
    <div className="jobs-item">
      <div className="jobs-item-info">
        <Link
          to={Jobs.getLink(document, false, false)}
          target={Jobs.getLinkTarget(document)}
        >
          <p className="jobs-item-name">{document.name}</p>
        </Link>
        {/* {document.place.name && renderPlace()} */}
        <small className="jobs-item-type">{`Type: ${document.domain}`}</small>
        <p className="jobs-item-type">
          <small className="jobs-item-type">{`Company: ${document.companyName}`}</small>
        </p>
      </div>
    </div>
  );
};

registerComponent('JobsItemMinimum', JobsItemMinimum);