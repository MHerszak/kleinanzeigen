import { registerComponent, getSetting } from 'meteor/vulcan:core';

import React from 'react';

import { Link } from 'react-router';

const Footer = props => (
  <footer className="footer">
    <a href={getSetting('facebookPage')} target="_blank">Like us on Facebook</a>
      &nbsp;|&nbsp;
    Build in Edmonton by 
    <Link
      to="http://base2industries.com/"
      target="_blank"
    >
      <span className="companie-item-name"> Base2industries</span>
    </Link>
  </footer>
);

Footer.displayName = 'Footer';

registerComponent('Footer', Footer);
