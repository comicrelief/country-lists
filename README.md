# Country lists

A small module that exports country lists used by Comic Relief's frontend components. Country data comes from the popular npm [`country-list`](https://www.npmjs.com/package/country-list) package.

## Installation
```sh
npm i @comicrelief/country-lists
# or
yarn add @comicrelief/country-lists
```


## This package currently comes with 2 country lists

`ALL_COUNTRIES`

Includes every country as provided by the popular npm package `country-list`.

`UK_AND_CHANNEL_ISLES`

Includes the United Kingdom and its Crown Dependencies: the Isle of Man, Jersey, and Guernsey.


## Each list includes these functions

- `.getSelectItems()`: returns the required `{ value, displayValue }` objects for the current `<Select>` component from our `https://github.com/comicrelief/component-library` repo.

- `.getLegacySelectItems()`: returns the required `{ label, value }` objects for the legacy `SelectField` component from our `https://github.com/comicrelief/storybook` repo.

- `.getNames()`: returns a plain list of country names.


## Example usage in React using comicrelief/component-library:
```
import { Select } from "@comicrelief/component-library";
import { ALL_COUNTRIES } from '@comicrelief/country-lists'
...

<Select
  ...
  options={ALL_COUNTRIES.getSelectItems()}
/>
```

## Example usage in React using legacy comicrelief/storybook component library
```
import { SelectField } from '@comicrelief/storybook';
import { ALL_COUNTRIES } from '@comicrelief/country-lists';
...

<SelectField
  ...
  options={ALL_COUNTRIES.getLegacySelectItems()}
/>
```

