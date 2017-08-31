import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationGroup } from '../application-group-detail-container/application-group-detail-container.interface';
@Pipe({
  name: 'contextFilter'
})
export class ContextFilterPipe implements PipeTransform {

  transform(items: any, selectedValue: any, sequenceOfContext: string, index: number): any {
    if (!items || selectedValue === null || sequenceOfContext === null || index === null) {
      return items;
    }
    let result = [];
    if (index === 0) {
      result = items.filter((item: any) => {
        if ( item[sequenceOfContext[index]] !== undefined
        && item[sequenceOfContext[index]] !== null
        && item[sequenceOfContext[index]] !== '') {
         return true;
       }else {
         return false;
       }
    });
    }else {
      console.log('checking second');
      result = items.filter((item: any) => {
        let flag = true;
        for (let i = 0 ; i < index; i++) {
          flag = this.checkIndex(item, i, sequenceOfContext, selectedValue);
          if (!flag) {
            break;
          }
        }
        return flag;
    });
    }
    return result;
  }

  checkIndex(item: any, index: number, sequenceOfContext: any, selectedValue) {
    if ( _.includes(selectedValue[sequenceOfContext[index]].toLowerCase(), ('All ').toLowerCase())
        && item[sequenceOfContext[index]] !== undefined
        && item[sequenceOfContext[index]] !== null
        && item[sequenceOfContext[index]] !== '') {
         return true;
       } else {
         if (item[sequenceOfContext[index]] === selectedValue[sequenceOfContext[index]]) {
           return true;
         }else {
           return false;
         }
       }
  }


}
