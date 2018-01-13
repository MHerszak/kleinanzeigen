import { Companies } from './collection.js';

Companies.addView('companiesSearch', terms => ({
  options: {
    sort: { sticky: -1, baseScore: -1 }
  }
}));