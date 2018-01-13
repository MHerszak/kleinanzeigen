import React from 'react';

import { IndexLink } from 'react-router';

import { registerComponent } from 'meteor/vulcan:core';

const Logo = ({ height, logoUrl, siteTitle }) => {
  if (logoUrl) {
    return (
      <h3 className="logo-image ">
        <IndexLink to={{ pathname: '/' }}>
          <img src={logoUrl} height={height} alt={siteTitle} />
        </IndexLink>
      </h3>
    )
  } else {
    return (
      <h3 className="logo-text">
        <IndexLink to={{ pathname: '/' }}>{siteTitle}</IndexLink>
      </h3>
    )
  }
};

Logo.displayName = "Logo";

registerComponent('Logo', Logo);