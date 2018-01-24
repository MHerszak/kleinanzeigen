import Places from './collection.js';

const resolvers = {

  single: {
    
    name: 'placesSingle',

    async resolver(root, {documentId}, {currentUser, Users, Posts}) {
      // const place = await Places.loader.load(documentId);
      return Places.loader.load(documentId);
    },
  
  },

};

export default resolvers;
