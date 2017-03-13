import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Message } from './message';

@Pipe({
    name: 'formFilter',
    pure: false
})
@Injectable()

export class FormFilterPipe implements PipeTransform {
	transform(array: any[], filter:any, fields: string[]): any[] {
		if (!filter.trim())
			return array

		let filterStr = filter.toString().toLowerCase()

		return array.filter(item =>
			fields.reduce( (prev: boolean, value:string) => {
				if (item[value] === undefined)
					throw new TypeError(`Field ${value} is not found`)

				let str = item[value]

				return prev || str.toString().toLowerCase().indexOf(filterStr) >= 0
			}, false)
		)
	}
}
