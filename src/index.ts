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


/**
 * Includes the United Kingdom and its Crown Dependencies: the Isle of Man,
 * Jersey, and Guernsey.
 */
export const UK_AND_CHANNEL_ISLES = createList({
  include: [
    'Guernsey',
    'Isle of Man',
    'Jersey',
    'United Kingdom',
  ],
});
