import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'applicationsFilter'
})
export class ApplicationsFilterPipe implements PipeTransform {

  transform(items: any, searchString: string, key: string): any {
    if (items === null || searchString === null || typeof searchString === 'undefined'  || searchString === '' || items[0] === -1) {
      return items;
    }
    const result = items.filter((item: any) => {
      if ( key === undefined || key === null || key === '') {
        return _.includes(item.toLowerCase(), searchString.toLowerCase());
      }else {
        return item[key] ? _.includes(item[key].toLowerCase(), searchString.toLowerCase()) : false;
      }
    });
    if ( result.length === 0) {
      return [-1];
    }
    return result;
  }

}
