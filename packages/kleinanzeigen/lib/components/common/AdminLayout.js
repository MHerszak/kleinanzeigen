/*

Layout

*/

import React from 'react';

import classNames from 'classnames';

import Helmet from 'react-helmet';

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

const AdminLayout = ({currentUser, children, currentRoute}) => (
  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>

    <Components.Header />

    <div className="admin-main">

      <Components.FlashMessages />

      {React.cloneElement(children, { currentUser })}

    </div>

    <Components.Footer />

  </div>
);

registerComponent('AdminLayout', AdminLayout, withCurrentUser);

// export default withCurrentUser(Layout);
