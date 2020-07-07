import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // transform(value: string, ...args) {
  //   return value.toLowerCase();
  // }
  transform(value: any, args?: any): any {

    let uniqueArray = value.filter(function (el, index, array) { 
        return array.indexOf (el) == index;
    });

    return uniqueArray;   
 } 
}
