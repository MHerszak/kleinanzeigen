import React from 'react';

import { Components, registerComponent } from 'meteor/vulcan:core';

const PlaceInfo = ({name, adr_address, url, website}) => (
  <div className="place-info">
    <h3 className="place-info-name">{name}</h3>
    <div className="place-info-address" dangerouslySetInnerHTML={{__html: adr_address.replace(/,/g, '')}} />
    <ul className="place-info-links">
      <li><a href={url} target="_blank"><Components.Icon name="place"/> Open in Google Maps</a></li>
      {website ? <li><a href={website} target="_blank"><Components.Icon name="link"/> Website</a></li> : null}
    </ul>
  </div>
);

registerComponent('PlaceInfo', PlaceInfo);
