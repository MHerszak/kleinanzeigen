import { registerComponent, getSetting } from 'meteor/vulcan:core';

import React from 'react';

import { Link } from 'react-router';

const FooterLink = ({name, path, url}) => {
  return (
    <span className="footer-link" key={name}>
      {path ? <Link to={{pathname: path}}>{name}</Link> : <a href={url} target="_blank">{name}</a>}
    </span>
  )
};

const Footer = props => {

  const footerLinks = [{
      name: "Terms of Service",
      path: "/privacy"
    },
    {
      name: "Like on Facebook",
      url: getSetting('facebookPage')
    },
    {
      name: "Jobs",
      path: "/jobs"
    }];
  return (
    <footer className="footer">
      {footerLinks.map(FooterLink)}
      {/* <a href={getSetting('facebookPage')} target="_blank">Like us on Facebook</a>
        &nbsp;|&nbsp; */}
      Build in Edmonton by 
      <Link
        to="http://base2industries.com/"
        target="_blank"
      >
        <span className="companie-item-name"> Base2industries</span>
      </Link>
    </footer>
  );
}

Footer.displayName = 'Footer';

registerComponent('Footer', Footer);
