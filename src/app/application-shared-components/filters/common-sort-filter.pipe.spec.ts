import { CommonSortFilterPipe } from './common-sort-filter.pipe';

describe('CommonSortFilterPipe', () => {
    let pipe;

    beforeEach(() => {
        pipe = new CommonSortFilterPipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should sort item list', () => {
        const items = [{ context: { value1: '1', value2: '2'}}, {context: { value3: '3', value4: '4' } }];
        let result = pipe.transform(items, 'value3');
        expect(result).toEqual( ['All value3', undefined ]);

        result = pipe.transform(undefined, undefined);
        expect(result).toEqual(undefined);
    });
});
