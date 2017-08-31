import { ApplicationsFilterPipe } from './applications-filter.pipe';

describe('ApplicationsFilterPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ApplicationsFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test empty items', () => {
    const items = null;
    const result = pipe.transform(items);
    expect(result).toBe(null);
  });

  it('should test empty search string', () => {
    const items = [1, 2, 3];
    const result = pipe.transform(items, '');
    expect(result).toBe(items);
  });

  it('should test items array with -1 at first index', () => {
    const items = [-1];
    const result = pipe.transform(items, 'search text');
    expect(result).toBe(items);
  });

  it('should test empty items array', () => {
    const items = [];
    const result = pipe.transform(items, 'search text');
    expect(result.toString()).toBe('-1');
  });

  it('should test items array with undefined key', () => {
    const items = ['Test1', 'Test2'];
    const result = pipe.transform(items, 'search text');
    expect(result.toString()).toBe('-1');
  });

  it('should test items array with null key', () => {
    const items = ['Test1', 'Test2'];
    const result = pipe.transform(items, 'search text', null);
    expect(result.toString()).toBe('-1');
  });

  it('should test items array with empty key', () => {
    const items = ['Test1', 'Test2'];
    const result = pipe.transform(items, 'search text', '');
    expect(result.toString()).toBe('-1');
  });

  it('should test items array with given key - no matching search text', () => {
    const items = ['Test1', 'Test2'];
    const result = pipe.transform(items, 'Test', 0);
    expect(result.toString()).toBe('-1');
  });

  it('should test items array with given key - matching search text', () => {
    const items = ['Test1', 'Test2'];
    const result = pipe.transform(items, 'T', 0);
    expect(result.toString()).toBe('Test1,Test2');
  });
});
