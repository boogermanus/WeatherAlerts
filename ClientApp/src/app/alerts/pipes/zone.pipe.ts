import { Pipe, PipeTransform } from '@angular/core';
import { IZoneProperties } from 'src/app/weather-api/interfaces/izone-properties';

@Pipe({
  name: 'zoneFilter'
})
export class ZonePipe implements PipeTransform {

  transform(value: IZoneProperties[], filterBy: string): IZoneProperties[] {
      filterBy = filterBy ? filterBy.toLowerCase() : null;
      return filterBy
        ? value.filter((item: IZoneProperties) => item.name.toLowerCase().startsWith(filterBy))
        : value;
  }

}
