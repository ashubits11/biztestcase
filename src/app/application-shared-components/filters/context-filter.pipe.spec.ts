import { ContextFilterPipe } from './context-filter.pipe';

describe('ContextFilterPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ContextFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test empty items', () => {
    const items = null;
    const result = pipe.transform(items);
    expect(result).toBe(null);
  });

  it('should test empty selectedValue', () => {
    const items = [];
    const selectedValue = null;
    const result = pipe.transform(items, selectedValue);
    expect(result).toBe(items);
  });

  it('should test empty typeOfContext', () => {
    const items = [];
    const typeOfContext = null;
    const result = pipe.transform(items, typeOfContext);
    expect(result).toBe(items);
  });

  it('should filter items for given context', () => {
    const items = [
      {'facilty': '*'},
      {'faciltiy': 'abc'},
      {'facility': 'bcf'}
      ];
      const typeOfContext = 'facilty';
      const selectedValue = {'facilty': '*'};
    const result = pipe.transform(items, selectedValue, typeOfContext);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(items));
  });


  xit('should filter items for given context', () => {
    const items = [
      {'facilty': '*'},
      {'faciltiy': 'abc'},
      {'facility': 'bcf'}
      ];
      const typeOfContext = 'facilty';
      const selectedValue = {'facilty': 'abc'};
    const result = pipe.transform(items, selectedValue, typeOfContext);
    expect(JSON.stringify(result)).toEqual(JSON.stringify([{'faciltiy': 'abc'}]));
  });

  xit('should filter items for given context', () => {
    const items = [
      {'facilty': '*', 'party': '*'},
      {'faciltiy': 'abc', 'party': 'party1'},
      {'facility': 'bcf', 'party': 'party2'}
      ];
      const typeOfContext = 'party';
      const selectedValue = {'facilty': 'abc', 'party': 'party1'};
    const result = pipe.transform(items, selectedValue, typeOfContext);
    expect(result).toEqual([{'faciltiy': 'abc', 'party': 'party1'}]);
  });


});
