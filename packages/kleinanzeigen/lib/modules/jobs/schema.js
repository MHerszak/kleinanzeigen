// import FormsUpload from 'meteor/vulcan:forms-upload';
// import { amenities, spaces } from '../data';
import { Utils } from 'meteor/vulcan:core';

const formGroups = {

  infos: {
    name: 'infos',
    label: 'Infos',
    order: 10,
  },

  address: {
    name: 'address',
    label: 'Address',
    order: 40,
    startCollapsed: true
  },
};

const schema = {
  
  // default properties

  _id: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },

  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: (document, currentUser) => {
      return new Date();
    }
  },

  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (movie, args, context) => {
        return context.Users.findOne({
          _id: movie.userId
        },
        {
          fields: context.Users.getViewableFields(context.currentUser, context.Users)
        });
      },
      addOriginalField: true
    }  
  },

  type: {
    label: 'Type',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'select',
    form: {
      options: [
        { label: 'Implementation', value: 'implementation' },
        { label: 'Testing', value: 'testing' },
        { label: 'Voice', value: 'voice' },
        { label: 'Data & Analytics', value: 'data_and_analytics' },
        { label: 'NLP', value: 'nlp' },
        { label: 'Imaging', value: 'imaging' },
        { label: 'Classification', value: 'classification' },
        { label: 'Architecture Design', value: 'architecture_design' },
        { label: 'Software Design', value: 'software_design' },
        { label: 'Research & Development', value: 'r_n_d' },
      ]
    },
    group: formGroups.info
  },

  domain: {
    label: 'Domain',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'select',
    form: {
      options: [
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Automobile', value: 'automobile' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Appliances', value: 'appliances' },
        { label: 'Software', value: 'software' },
        { label: 'Security', value: 'security' },
        { label: 'Journalism', value: 'journalism' },
        { label: 'Entertainment', value: 'entertainment' },
        { label: 'Finance', value: 'finance' },
        { label: 'Retail', value: 'retail' },
      ]
    },
    group: formGroups.info
  },

  /**
   URL
   */
  url: {
    type: String,
    optional: true,
    max: 500,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'url',
    order: 10,
    searchable: true
  },

  name: {
    label: 'Name',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.info,
    searchable: true,
    limit: 90,
    max: 90
  },

  companyName: {
    label: 'Company Name',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.info,
    searchable: true,
    limit: 90,
    max: 90
  },

  description: {
    label: 'Description',
    type: String,
    optional: false,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    control: 'textarea',
    group: formGroups.info,
    searchable: true,
    limit: 300,
    max: 300
  },

  country: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.address
  },

  zipCode: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.address
  },

  state: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.address
  },

  city: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.address
  },

  address: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.address
  },

  address2: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    group: formGroups.address
  },

  geoData: {
    type: Object,
    blackbox: true,
    optional: true,
  },

  location: {
    type: Object,
    blackbox: true,
    optional: true,
    viewableBy: ['guests']
  },

  // GraphQL-only fields
  pageUrl: {
    type: String,
    optional: true,
    resolveAs: {
      type: 'String',
      resolver: (document, args, context) => {
        return `${Utils.getSiteUrl()}/jobs/${document._id}`;
      },
    }  
  }
};

export default schema;