/*

Footer

*/

import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const Footer = props => 
  <footer className="footer">
    <Link
      to="http://base2industries.com/"
      target="_blank"
    >
      <p className="companie-item-name">Base2industries</p>
    </Link>
  </footer>


Footer.displayName = 'Footer';

registerComponent('Footer', Footer);

// export default Footer;