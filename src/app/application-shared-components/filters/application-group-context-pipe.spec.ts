import { ApplicationGroupContextPipe } from './application-group-context-pipe';
import { ApplicationGroup } from '../application-shared-components.module';
describe('ApplicationGroupContextPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new ApplicationGroupContextPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should test empty items', () => {
    const items = null;
    const result = pipe.transform(items);
    expect(result).toBe(null);
  });

  it('should test application contexts from item list', () => {
    const items = [{value1: '1', value2: '2'}, {value3: '3', value4: '4'}];
    const selectedContext = {value3: '3', value4: '4'};
    const result = pipe.transform(items, selectedContext);
    expect(result).toEqual([-1]);
  });

  it('should return application group', () => {
    const applicationGroup = new ApplicationGroup();
    applicationGroup.context = { facility: 'abc', party: 'party1' };
    applicationGroup.userGroup = 'appplication group1';

    const applicationGroup1 = new ApplicationGroup();
    applicationGroup1.context = { facility: 'def' };
    applicationGroup1.userGroup = 'appplication group1';

    const items = [
      applicationGroup,
      applicationGroup1
    ];
    const result = pipe.transform(items, { facility: 'abc' });
    expect(result.length === 1).toBe(true);
  });
});
