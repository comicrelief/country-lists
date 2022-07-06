# Country lists

A small module that exports country lists used by Comic Relief's frontend components. Country data comes from [`country-list`](https://www.npmjs.com/package/country-list).

## Usage

Install using npm or yarn:

```sh
npm i @comicrelief/country-lists
# or
yarn add @comicrelief/country-lists
```

Each list includes:

- `getNames()`: returns the plain names of the countries
- `getSelectItems()`: returns `{ value, displayValue }` objects for our current `<Select>` component
- `getLegacySelectItems()`: returns `{ value, label }` objects for our legacy components

## Lists

### `ALL_COUNTRIES`

Includes every country as provided by `country-list`.
