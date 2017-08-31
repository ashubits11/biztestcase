import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationGroup } from '../application-group-detail-container/application-group-detail-container.interface';
import { SelectedContext } from '../appilication-detail-dropdown/application-detail-dropdown.interface';
@Pipe({
  name: 'applicationGroupContextKey'
})
export class ApplicationGroupContextKeyPipe implements PipeTransform {

  transform(item: ApplicationGroup): any {
    if (!item || !item.context) {
      return [];
    }
    const keys = Object.keys(item.context);
    const result = [];
    keys.forEach(element => {
        result.push(item.context[element]);
    });
    return result;
  }
}
