import { registerFragment, extendFragment } from 'meteor/vulcan:core';

registerFragment(`
  fragment PostsList on Post {
    # posts
    _id
    title
    url
    slug
    postedAt
    createdAt
    sticky
    sponsored
    status
    excerpt
    viewCount
    clickCount
    # users
    userId
    user {
      ...UsersMinimumInfo
    }
    # embedly
    thumbnailUrl
    # comments
    commentCount
    commenters {
      ...UsersMinimumInfo
    }
    # voting
    currentUserVotes{
      ...VoteFragment
    }
    baseScore
    score
  }
`);

registerFragment(`
  fragment PostsPage on Post {
    ...PostsList
    body
    htmlBody
    featured
    media
  }
`);

extendFragment('PostsList', `
  featured
  cloudinaryUrls
  sponsoredCandidate
  shortTitle
`);

// extendFragment('PostsPage', `
//   featured
//   media
// `);
