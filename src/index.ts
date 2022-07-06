import countryList from 'country-list';

import { createList } from './helpers';

// shorten the name of the UK in country data (this is a global change)
countryList.overwrite([{
  code: 'GB',
  name: 'United Kingdom',
}]);

/**
 * Includes every country as provided by `country-list`.
 */
export const ALL_COUNTRIES = createList();
