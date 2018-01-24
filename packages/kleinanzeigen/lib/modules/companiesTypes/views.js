/*

Default sort

*/

import { CompaniesTypes } from './collection.js';

CompaniesTypes.addDefaultView(terms => ({
  options: {
    sort: {
      order: 1
    }
  }
}));