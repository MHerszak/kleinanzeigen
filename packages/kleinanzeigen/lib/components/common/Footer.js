/*

Footer

*/

import { registerComponent } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';

const Footer = props => 
  <footer className="footer">
    Build in Edmonton by 
    <Link
      to="http://base2industries.com/"
      target="_blank"
    >
      <span className="companie-item-name"> Base2industries</span>
    </Link>
  </footer>


Footer.displayName = 'Footer';

registerComponent('Footer', Footer);

// export default Footer;