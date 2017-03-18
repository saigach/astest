import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { PagerService } from './pager.service';

@Pipe({
  name: 'fromFilter'
})
@Injectable()
export class FromFilterPipe implements PipeTransform {

  constructor(private PagerService: PagerService) { };

  transform(array: any[], filter: any, fields: string[]): any[] {

    if (!filter.trim()) {
      if (array != undefined) {
        this.PagerService.initPager(array);
      }
      return array;
    }

    if (array == null) return null;
    let filterStr = filter.toString().toLowerCase();

    let newArray = array.filter(item =>
      fields.reduce((prev: boolean, value: string) => {
        if (item[value] === undefined)
          throw new TypeError(`Field ${value} is not found`);

        let str = item[value];

        return prev || str.toString().toLowerCase().indexOf(filterStr) >= 0
      }, false)
    );

    this.PagerService.initPager(newArray);
    this.PagerService.resetPage();

    return newArray;
  }
}

@Pipe({
  name: 'durationFilter'
})
export class DurationFilterPipe {

  constructor(private PagerService: PagerService) { };

  transform(array: any[], filter: number, fields: string[]): any[] {
    if (filter == 0) {
      if (array != undefined) {
        this.PagerService.initPager(array);
      }
      return array;
    }


    if (array == null) return null;



    let newArray = array.filter(item =>
      fields.reduce((prev: boolean, value: string) => {
        if (item[value] === undefined)
          throw new TypeError(`Field ${value} is not found`);

        let num = item[value];

        return prev || num < filter
      }, false)
    );

    this.PagerService.initPager(newArray);

    return newArray;
  }
}
