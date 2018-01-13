import React from 'react';

import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { Nav, NavLink, NavItem } from 'reactstrap';

import { FormattedMessage } from 'meteor/vulcan:i18n';

import { registerComponent, withCurrentUser, Utils, Components } from 'meteor/vulcan:core';

import { withRouter } from 'react-router'

import Users from 'meteor/vulcan:users';

const PostsViews = (props) => {

  let views = ['top', 'new', 'best'];
  const adminViews = ['pending', 'rejected', 'scheduled'];

  if (Users.canDo(props.currentUser, 'posts.edit.all')) {
    views = views.concat(adminViews);
  }

  const query = _.clone(props.router.location.query);

  renderViewsFilter = (view) => {
    return (
      <NavItem key={view}>
        <NavLink to={{ pathname: Utils.getRoutePath('posts.list'), query: { ...query, view: view }}} tag={Link}>
          <FormattedMessage id={'posts.' + view}/>
        </NavLink>
      </NavItem>
    );
  };

  return (
    <Nav>
      {views.map(renderViewsFilter)}
    </Nav>
  )
  // return (
  //   <div className="posts-views">
  //     {views.map(renderViewsFilter)}
  //   </div>
  // );

  // return (
  //   <div className="posts-views">
  //     <Components.ButtonDropdown
  //       // className="categories-list btn-secondary"
  //       // title={React.cloneElement(FormattedMessage, { id: 'categories' })}
  //       title={<FormattedMessage id="posts.view"/>}
  //       id="views-dropdown"
  //     >
  //       <DropdownMenu>
  //       {views.map(view =>
  //         <DropdownItem key={view} tag={Link} to={{ pathname: Utils.getRoutePath('posts.list'), query: {...query, view: view }}}>
  //           <FormattedMessage id={"posts."+view}/>
  //         </DropdownItem>
  //       )}
  //       <DropdownItem key={'daily-tag'} tag={Link} to="/daily">
  //         <FormattedMessage id="posts.daily"/>
  //       </DropdownItem>
  //       </DropdownMenu>
  //     </Components.ButtonDropdown>
  //   </div>
  // );
};

PostsViews.propTypes = {
  currentUser: PropTypes.object,
  defaultView: PropTypes.string
};

PostsViews.defaultProps = {
  defaultView: 'top'
};

// PostsViews.contextTypes = {
//   currentRoute: PropTypes.object,
//   intl: intlShape
// };

PostsViews.displayName = 'PostsViews';

registerComponent('PostsViews', PostsViews, withCurrentUser, withRouter);
