import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { PagerService } from './pager.service';
import * as moment from 'moment';

@Pipe({
  name: 'dateFilter'
})
@Injectable()
export class DateFilterPipe implements PipeTransform {

constructor(private PagerService: PagerService) { };

  transform(array: any[], filter: any, fields: string[]): any[] {

    let ranges: any = {
      "Today": [moment(), moment()],
      "Yesterday": [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last7Days": [moment().subtract(6, "days"), moment()],
      "Last30Days": [moment().subtract(29, "days"), moment()],
      "ThisMonth": [moment().startOf("month"), moment().endOf("month")],
      "LastYear": [moment().subtract(1, "year").startOf("year"), moment().subtract(1, "year").endOf("year")]
    }
    if (array == null) return null

    if (typeof filter === 'undefined' || !filter) return array

    let filterStr = filter.toString().toLowerCase()
    let selectedRange = ranges[filter]

    let newArray = array.filter(item =>
      fields.reduce((prev: boolean, value: string) => {
        if (item[value] === undefined)
          throw new TypeError(`Field ${value} is not found`)

        let curMoment = moment(item[value])

        return prev || (!(curMoment.isBefore(selectedRange[0]) || curMoment.isAfter(selectedRange[1])))

      }, false)
    )

    this.PagerService.initPager(newArray)

    return newArray
  }
}

@Pipe({
  name: 'secPipe'
})
@Injectable()
export class secPipe implements PipeTransform {

constructor(private PagerService: PagerService) { };

  transform(item: any): any {

    if (item == null) return null

    function pad(num: number): string {
      return ("0" + num).slice(-2);
    }
    function mmss(secs: number): string {
      var minutes = Math.floor(secs / 60);
      secs = secs % 60;
      minutes = minutes % 60;
      return pad(minutes) + ":" + pad(secs);
    }

    return mmss(item)

  }
}
