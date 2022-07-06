import { expect } from 'chai';
import countryList from 'country-list';

import { createList } from '@/src/helpers';
import * as index from '@/src/index';

const names = new Set(countryList.getNames());

describe('createList', () => {
  context('when `include` is specified', () => {
    it('should include only the given countries', () => {
      const include = ['United Kingdom'];
      const list = createList({ include }).getNames();
      expect(list).to.deep.equal(include);
    });

    it('throws if there is an unrecognised name', () => {
      expect(() => createList({ include: ['Narnia'] })).to.throw(
        'The following included country names are not recognised:\n\n'
        + '    Narnia',
      );
    });
  });

  context('when `exclude` is specified', () => {
    it('should not include the given countries', () => {
      const exclude = ['United Kingdom'];
      const list = createList({ exclude }).getNames();
      exclude.forEach((name) => {
        expect(list).not.to.include(name);
      });
    });

    it('throws if there is an unrecognised name', () => {
      expect(() => createList({ exclude: ['Narnia'] })).to.throw(
        'The following excluded country names are not recognised:\n\n'
        + '    Narnia',
      );
    });
  });
});

Object.entries(index).forEach(([name, list]) => {
  describe(name, () => {
    describe('getNames()', () => {
      it('returns a list of country names', () => {
        const data = list.getNames();
        expect(data).to.be.an('array').that.is.not.empty;
        data.forEach((item) => {
          expect(names).to.contain(item);
        });
      });
    });

    describe('getSelectItems()', () => {
      it('returns a list of { value, displayValue }', () => {
        const items = list.getSelectItems();
        expect(items).to.be.an('array').that.is.not.empty;
        items.forEach((item) => {
          expect(item).to.be.an('object');
          expect(item).to.have.property('value').that.is.a('string');
          expect(item).to.have.property('displayValue').that.is.a('string');
          expect(names).to.contain(item.value);
          expect(item.displayValue).to.equal(item.value);
        });
      });
    });

    describe('getLegacySelectItems()', () => {
      it('returns a list of { value, label }', () => {
        const items = list.getLegacySelectItems();
        expect(items).to.be.an('array').that.is.not.empty;
        items.forEach((item) => {
          expect(item).to.be.an('object');
          expect(item).to.have.property('value').that.is.a('string');
          expect(item).to.have.property('label').that.is.a('string');
          expect(names).to.contain(item.value);
          expect(item.label).to.equal(item.value);
        });
      });
    });
  });
});
