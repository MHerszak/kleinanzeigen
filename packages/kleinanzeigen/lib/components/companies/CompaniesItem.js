import React from 'react';

import { Link } from 'react-router';

import { Badge, Media } from 'reactstrap';

import { Components, registerComponent } from 'meteor/vulcan:core';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { Companies } from '../../modules/companies/index';

const CompaniesItem = ({ document, currentUser }) => {
  const renderPlace = () => (
    <small className="companie-item-icon">
      <Components.Icon name="globe" />{document.place.name ? document.place.name : 'No place given'}
    </small>
  );
  const renderActions = () => {
    return (
      <div className="companies-actions">
        <Components.ModalTrigger
          title="Edit your Company"
          component={
            <a className="companies-action-edit">
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
          className="companies-name"
        >
          {document.name}
        </Media>
        <div>{document.description}</div>
        <div className="meta" style={{ display: 'flex' }}>
          <Badge color="warning">{document.type}</Badge>
          <span className="companies-place">
            {renderPlace()}
          </span>
          <span>{Companies.options.mutations.edit.check(currentUser, document) && renderActions()}</span>
        </div>
      </Media>
    </Media>
  );
};

registerComponent('CompaniesItem', CompaniesItem);