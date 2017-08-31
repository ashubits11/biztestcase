import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationGroup } from '../application-group-detail-container/application-group-detail-container.interface';
import { SelectedContext } from '../appilication-detail-dropdown/application-detail-dropdown.interface';
@Pipe({
  name: 'applicationGroupContext'
})
export class ApplicationGroupContextPipe implements PipeTransform {

  transform(items: Array<ApplicationGroup>, selectedContext: any): any {
    if (!items || selectedContext === null) {
      return items;
    }
    const keys = Object.keys(selectedContext);
    const result = items.filter((item: ApplicationGroup) => {
      return keys.every((selectedValueKey: string, index: number) => {
        if (
          _.includes(selectedContext[selectedValueKey].toLowerCase(), ('All ').toLowerCase())
        ) {
          return true;
        }else {
          if (item.context && item.context[selectedValueKey] === selectedContext[selectedValueKey]) {
            return true;
          } else {
            return false;
          }
        }
      });
    });
    if (result.length >= 1) {
      return result;
    }else {
      return [-1];
    }
  }
}
