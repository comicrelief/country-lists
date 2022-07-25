import countryList from 'country-list';

export interface CountryList {
  /**
   * Returns the list of plain country names.
   */
  getNames: () => string[],

  /**
   * Returns a list of `{ value, displayValue }` for use with our `<Select/>` component.
   */
  getSelectItems: () => { value: string, displayValue: string, selected?: boolean }[],
  
  /**
   * Returns a list of `{ value, label }` for use with our legacy components.
   */
  getLegacySelectItems: () => { value: string, label: string, selected?: boolean }[],
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

  let getSelectItems = (defaultLabel?: string, defaultValue?: string) => {
    const output = countries.map((name) => ({ value: name, displayValue: name }));
    // Prepend the returned array with a pre-selected default option, when the
    // optional defaultLabel param is set
    if (defaultLabel) {
      let selectLabel = { displayValue: defaultLabel, value: defaultValue ? defaultValue : '', selected: true };
      output.unshift(selectLabel);
    } 
    return output;
  }

  let getLegacySelectItems = (defaultLabel?: string, defaultValue?: string) => {
    const output = countries.map((name) => ({ value: name, label: name }));
    // Prepend the returned array with a pre-selected default select option,
    // only when the optional defaultLabel param is set
    if (defaultLabel) {
      let selectLabel = { label: defaultLabel, value: defaultValue ? defaultValue : '', selected: true };
      output.unshift(selectLabel);
    } 
    return output;
  }

  return {
    getNames: () => [...countries],
    getSelectItems: getSelectItems,
    getLegacySelectItems: getLegacySelectItems,
  };
}
