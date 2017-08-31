import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationGroup } from '../application-group-detail-container/application-group-detail-container.interface';
@Pipe({
  name: 'commonSortPipe'
})
export class CommonSortFilterPipe implements PipeTransform {
  transform(items: any, context: any): any {
      if ( items && context) {
        const sortedValue = _.sortBy(_.uniq(items.map(element => element[context])));
        sortedValue.unshift(`All ${context}`);
        return sortedValue;
      } else {
          return items;
      }
  }
}
