import React from 'react';

import { Link } from 'react-router';

import { Card, /*CardImg,*/ CardText, CardBody,
  CardTitle, CardSubtitle, CardLink } from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

// import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

// const CompaniesItem = ({ document, currentUser }) => {
//   console.log(document);
//   return (
//     <div className="rooms-item">
//       <div className="rooms-item-info">
//         <Link to={Companies.getLink(document)} target={Companies.getLinkTarget(document)}>
//           <h3 className="rooms-item-name">{document.name}</h3>
//           {/*<h4 className="rooms-item-city">{document.city}</h4>*/}
//           <div className="rooms-item-city">{document.description}</div>
//         </Link>
//       </div>
//     </div>
//   );
// };

const CompaniesItem = ({ document, currentUser }) => (
  <div>
    <Card>
      <CardBody>
        <CardTitle>{document.name}</CardTitle>
        <CardSubtitle>Type of business: {document.type}</CardSubtitle>
        <CardText>{document.description}</CardText>
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

registerComponent('CompaniesItem', CompaniesItem);