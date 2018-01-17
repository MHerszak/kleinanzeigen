import React from 'react';

import { Link } from 'react-router';

import {
  Badge,

  Media,
} from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

// import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

// const CompaniesItem = ({ document, currentUser }) => {
  // const renderPlace = () => (
  //   <p className="companie-item-icon">
  //     <Components.Icon name="globe" /> {document.place.name}
  //   </p>
  // )
//   return (
//     <div>
//       <Card className="companies-listing">
//         <CardBody>
//           <CardTitle tag="h5">{document.name}</CardTitle>
//           <CardText>
//             <small>Type of business: {document.type}</small>
//           </CardText>
//           <CardText>{document.description}</CardText>
//           <CardText>{document.place.name && renderPlace()}</CardText>
//           <CardLink
//             tag={Link}
//             target={Companies.getLinkTarget(document)}
//             href={Companies.getLink(document, false, false)}
//           >
//             Go to page
//           </CardLink>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

const CompaniesItem = ({ document, currentUser }) => {
  const renderPlace = () => (
    <small className="companie-item-icon">
      <Components.Icon name="globe" /> {document.place.name}
    </small>
  )
  // console.log(document);
  return (
    <Media className="companies item">
      <Media left>
        <Media className="images" />
      </Media>
      <Media body className="text">
        <Media
          heading
          tag={Link}
          target={Companies.getLinkTarget(document)}
          href={Companies.getLink(document, false, false)}
        >
          {document.name}
        </Media>
        <div>
          {document.place.name && renderPlace()}
        </div>
        <div>{document.description}</div>
        <Badge>{document.type}</Badge>
      </Media>
    </Media>
  );
};

registerComponent('CompaniesItem', CompaniesItem);