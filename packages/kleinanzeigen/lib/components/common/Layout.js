/*

Layout

*/

import React from 'react';

// import classNames from 'classnames';

import Helmet from 'react-helmet';

import { Container } from 'reactstrap';

import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';

const Layout = ({currentUser, children, currentRoute}) => (
  <Container fluid>

    <Helmet>
      {/* <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/v4.0.0-beta.2/css/bootstrap.min.css"/>*/}
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>

    <Components.HeadTags />

    {/*<Components.HeaderWheeler />*/}

    <Components.Header />

    <div className="content">

      {currentUser && <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} />}

      <Components.FlashMessages />

      {React.cloneElement(children, { currentUser })}

      <Components.Footer />

    </div>
  </Container>
);

replaceComponent('Layout', Layout);
