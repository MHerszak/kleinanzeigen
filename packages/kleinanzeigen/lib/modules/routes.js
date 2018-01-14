/*

Routes

http://docs.vulcanjs.org/routing.html

*/

import { Components, addRoute, extendRoute } from 'meteor/vulcan:core';

addRoute([

  // { name: 'home',                  path: '/',                                  componentName: 'Home' },
  // { name: 'how-to',                path: '/how-to',                            componentName: 'HowTo' },
  // { name: 'about',                 path: '/about',                             componentName: 'About' },
  // { name: 'privacy',               path: '/privacy',                           componentName: 'Privacy' },
  // { name: 'terms',                 path: '/terms',                             componentName: 'Terms' },

  { name:'posts.list',             path: '/',                                  componentName: 'PostsHome' }, // index route
  { name:'posts.single',           path:'posts/:_id(/:slug)',                   componentName: 'PostsSingle' },

  { name:'jobs.list',                path: '/jobs',                            componentName: 'JobsHome' },
  { name:'jobs.add',                path: '/jobs/add',                            componentName: 'JobsAdd' },

  // { name:'sponsor',                path: '/sponsor',                            componentName: 'Sponsor' },
  // { name:'sponsorNewPost',         path: '/sponsor/new(/:postId)',              componentName: 'SponsorNewPost' },
  // { name:'sponsorPickDate',        path: '/sponsor/date/:postId',               componentName: 'SponsorPickDate' },
  // { name:'sponsorPay',             path: '/sponsor/pay/:postId',                componentName: 'SponsorPay' },

  { name:'users.single',           path:'users/:slug',                          componentName: 'UsersSingle' },
  { name:'users.account',          path:'account',                              componentName: 'UsersAccount' },
  { name:'users.edit',             path:'users/:slug/edit',                     componentName: 'UsersAccount' },

  { name: 'companies.list',             path: '/companies',                             componentName: 'CompaniesHome' },
  // { name: 'listings.new',          path: '/listings/new',                       componentName: 'ListingsNewPage' },
  { name: 'companies.single',         path: '/companies/:_id(/:slug)',           componentName: 'CompaniesSingle' },

  // { name: 'listings.search',       path: '/search',                             componentName: 'ListingsSearch' },
  // { name: 'listings.new',          path: '/listings/new',                       componentName: 'ListingsNewPage' },
  // { name: 'listings.page',         path: '/listings/:roomId(/:slug)',           componentName: 'ListingsPage' },

  // { name: 'users.signup',          path:'/sign-up',                            componentName: 'UsersSignUp' },
  // { name: 'users.login',           path:'/log-in',                             componentName: 'UsersLogIn' },

]);

extendRoute('admin', { layoutName: 'AdminLayout' });
