import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fromFilter'
})
@Injectable()
export class FromFilterPipe implements PipeTransform {
	transform(array: any[], filter:any, fields: string[]): any[] {
		if (!filter.trim())
			return array
        if (array == null) return null
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

@Pipe({
  name: 'durationFilter'
})
export class DurationFilterPipe {
  transform(array: any[], filter:number, fields: string[]): any[] {
      if (filter == 0)
          return array
      if (array == null) return null

      return array.filter(item =>
          fields.reduce( (prev: boolean, value:string) => {
              if (item[value] === undefined)
                  throw new TypeError(`Field ${value} is not found`)

              let num = item[value]

              return prev || num < filter
          }, false)
      )
  }
}
