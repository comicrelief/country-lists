import countryList from 'country-list';

export interface CountryList {
  /**
   * Returns the list of plain country names.
   */
  getNames: () => string[],

  /**
   * Returns a list of `{ value, displayValue }` for use with our `<Select/>` component.
   */
  getSelectItems: () => { value: string, displayValue: string }[],

  getSelectItemsLabel: () => { value: string, displayValue: string }[],
  /**
   * Returns a list of `{ value, label }` for use with our legacy components.
   */
  getLegacySelectItems: () => { value: string, label: string }[],
}

/**
 * Helper for generating country lists.
 *
 * The list of countries can be restricted to a given set using the `include`
 * option. Alternatively, create a list of all countries _except_ a given set
 * using the `exclude` option.
 *
 * @param options
 * @param options.include Optional list of country names to include.
 * @param options.exclude Optional list of country names to exclude.
 */
export function createList(options: { include?: string[], exclude?: string[] } = {}): CountryList {
  const { include, exclude } = options;
  const allCountries = countryList.getNames();

  // validate inputs
  if (include) {
    const badNames = include.filter((name) => !allCountries.includes(name));
    if (badNames.length) {
      throw new Error(
        'The following included country names are not recognised:'
        + `\n\n    ${badNames.join('\n    ')}`,
      );
    }
  }
  if (exclude) {
    const badNames = exclude.filter((name) => !allCountries.includes(name));
    if (badNames.length) {
      throw new Error(
        'The following excluded country names are not recognised:'
        + `\n\n    ${badNames.join('\n    ')}`,
      );
    }
  }

  let countries = include || allCountries;
  if (exclude) {
    countries = countries.filter((name) => !exclude.includes(name));
  }

  let selectLabel = { label: 'Please select', selected: true };
  let getSelectItems =  () => countries.map((name) => ({ value: name, displayValue: name }));
  let getLegacySelectItems = () => countries.map((name) => ({ value: name, label: name }));

  return {
    getNames: () => [...countries],
    getSelectItems: getSelectItems,
    getSelectItemsWithLabel: () => [ selectLabel, getSelectItems],
    getLegacySelectItems: getLegacySelectItems,
    getLegacySelectItemsWithLabel: () => [ selectLabel, getLegacySelectItems],
  };
}
