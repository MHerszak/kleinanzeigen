/*

Internationalization Strings

http://docs.vulcanjs.org/internationalization.html

*/

import { addStrings } from 'meteor/vulcan:core';

addStrings('en', {
  "nav.about": "About",

  "app.noPermission": "You have no permission for this content.",

  "users.edit_account": "Edit Account",
  "users.single": "User",

  "newsletter.title": "Subscribe to stay up to date with new stories!",
  "newsletter.subscribe": "Subscribe to stay up to date with new stories!",
  "newsletter.subscription.success": "Thanks for subscribing!",

  "listing.new": "Listing",
  "listing.new.navigation": "You can add a new listing when you follow this link.",

  "posts.new_post": "New Story",
  "posts.edit": "Edit",
  "posts.edit_success": "Post “{title}” edited.",
  "posts.delete": "Delete",
  "posts.delete_confirm": "Delete post “{title}”?",
  "posts.delete_success": "Post “{title}” deleted.",
  "posts.title": "Title",
  "posts.url": "URL",
  "posts.body": "Body",
  "posts.categories": "Categories",
  "posts.thumbnailUrl": "Thumbnail URL",
  "posts.status": "Status",
  "posts.sticky": "Sticky",
  "posts.load_more": "Load More",
  "posts.load_more_days": "Load More Days",
  "posts.no_more": "No more posts.",
  "posts.no_results": "No posts to display.",
  "posts.search": "Search",
  "posts.view": "View",
  "posts.top": "Top",
  "posts.new": "New",
  "posts.best": "Best",
  "posts.pending": "Pending",
  "posts.rejected": "Rejected",
  "posts.scheduled": "Scheduled",
  "posts.daily": "Daily",
  "posts.clear_thumbnail": "Clear Thumbnail",
  "posts.clear_thumbnail?": "Clear thumbnail?",
  "posts.enter_thumbnail_url": "Enter URL",
  "posts.created_message": "Post created.",
  "posts.rate_limit_error": "Please wait {value} seconds before posting again.",
  "posts.sign_up_or_log_in_first": "Please sign up or log in first.",
  "posts.postedAt": "Posted at",
  "posts.dateNotDefined": "Date not defined",
  "posts.subscribe": "Subscribe",
  "posts.unsubscribe": "Unsubscribe",
  "posts.subscribed": "You have subscribed to “{name}” comments.",
  "posts.unsubscribed": "You have unsubscribed from “{name}” comments.",
  "posts.subscribed_posts" : "Posts subscribed to",
  "posts.link_already_posted": "This link has already been posted.",
  "posts.max_per_day": "Sorry you cannot submit more than {value} posts per day.",
  "posts.like": "Like",

  "posts.sponsored": "Sponsored",
  "posts.featured": "Featured",
  "posts.shortTitle": "Short Title",

  "comments.comments": "Comments",
  "comments.count": "{count, plural, =0 {No comments} one {# comment} other {# comments}}",
  "comments.count_0": "No comments",
  "comments.count_1": "1 comment",
  "comments.count_2": "{count} comments",
  "comments.new": "New Comment",
  "comments.no_comments": "No comments to display.",
  "comments.reply": "Reply",
  "comments.edit": "Edit",
  "comments.delete": "Delete",
  "comments.delete_confirm": "Delete this comment?",
  "comments.delete_success": "Comment deleted.",
  "comments.please_log_in": "Please log in to comment.",
  "comments.parentCommentId": "Parent Comment ID",
  "comments.topLevelCommentId": "Top Level Comment ID",
  "comments.body": "Body",
  "comments.rate_limit_error": "Please wait {value} seconds before commenting again.",

  "categories": "Categories",
  "categories.all": "All Categories",
  "categories.edit": "Edit Category",
  "categories.edit_success": "Category “{name}” edited.",
  "categories.new": "New Category",
  "categories.new_success": "Category “{name}” created.",
  "categories.delete": "Delete Category",
  "categories.name": "Name",
  "categories.description": "Description",
  "categories.order": "Order",
  "categories.slug": "Slug",
  "categories.image": "Image",
  "categories.parentId": "Parent ID",
  "categories.subscribe": "Subscribe to this category\"s posts",
  "categories.unsubscribe": "Unsubscribe to this category\"s posts",
  "categories.subscribed": "You have subscribed to “{name}” posts.",
  "categories.unsubscribed": "You have unsubscribed from “{name}” posts.",
  "categories.subscribed_categories" : "Categories subscribed to",
  "categories.delete_confirm": "Delete category “{title}”?",
  "categories.delete_success": "Category “{name}” deleted.",
  "categories.invalid": "Invalid category",

  "accounts.already_have_an_account": "Already have an account?",
  "accounts.log_in_here": "Log in here",
  "accounts.login_link": "Login",
  "accounts.dont_have_an_account": "Don\"t have an account?",
  "accounts.sign_up_here": "Sign up here",

  "voting.upvote": "upvote",

  "listings.sidebar.sponsored": "sponsored",

  "sponsored.pending": "Pending Sponsored",
  "sponsor.page.title": "Sponsor Kleinanzeigen",

  "app.404": "Nothing here 404",
  "withCurrentUser(App)": "withCurrentUser(App)",

  // Companies
  "companies.new_post": "Add Company",
  "companies.edit": "Edit Company",
  "companies.edit_success": "The company “{name}” has been edited.",
  "companies.created_message": "Add Company",
  "companies.sign_up_or_log_in_first": "Please sign up or log in first.",
  "companies.link.companies": "Companies",
  "companies.search": "Search for a Company",
  "companies.search.btn": "Search Company",
  "companies.location": "Company Address",
  "companies_types.created_message": "Category “{name}” created.",
  

  // JObs
  "jobs.link.jobs": "Jobs",
  "jobs.created_message": "Your job listing has been created.",
  "jobs.sign_up_or_log_in_first": "Please sign up or log in first.",
  "jobs.dateNotDefined": "Date not defined.",
  "jobs.search": "Search for Jobs",
  // Listings actions
  // "listings.create_new": "New Listing",
  // "listings.created": "Listing created",
  // Listing types
  // "listings.leisure": "hotels, public houses, restaurants, cafes, sports facilities",
  // "listings.retail": "retail stores, shopping malls, shops",
  // "listings.office": "office buildings, serviced offices",
  // "listings.industrial": "industrial property, office/warehouses, garages, distribution centers",
  // "listings.healthcare": "medical centres, hospitals, nursing homes",
  // "listings.multifamily": "multifamily housing buildings",
  // "listings.others": "All other commercial real estate types..",

  // "listing.link.companies": "Companies",
});
