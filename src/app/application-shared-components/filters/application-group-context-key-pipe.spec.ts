
import { ApplicationGroupContextKeyPipe } from './application-group-context-key-pipe';
import { ApplicationGroup } from '../application-shared-components.module';

describe('ApplicationGroupContextKeyPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ApplicationGroupContextKeyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test empty items', () => {
    const items = null;
    const result = pipe.transform(items);
    expect(result).toEqual([]);
  });
  it('should return application context keys contexts from item list', () => {
    const items = {context: {value1: '1', value2: '2', value3: '3', value4: '4'}};
    const result = pipe.transform(items);
    expect(result.length).toEqual(4);
  });
});
