import React from 'react';

import { Link } from 'react-router';

import {
  Badge,

  Media,
} from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

const CompaniesItem = ({ document, currentUser }) => {
  const renderPlace = () => (
    <small className="companie-item-icon">
      <Components.Icon name="globe" /> {document.place.name}
    </small>
  );
  const renderActions = () => {
    return (
      <div className="posts-actions">
        <Components.ModalTrigger
          title="Edit your Company"
          component={
            <a className="posts-action-edit">
              <FormattedMessage id="companies.edit" />
            </a>}>
          <Components.CompaniesEditForm document={document} />
        </Components.ModalTrigger>
      </div>
    );
  };
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
        <div style={{ display: 'flex' }}>
          <Badge>{document.type}</Badge>
          <span>{Companies.options.mutations.edit.check(currentUser, document) && renderActions()}</span>
        </div>
      </Media>
    </Media>
  );
};

registerComponent('CompaniesItem', CompaniesItem);