import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime',
})
export class ConvertTimePipe implements PipeTransform {
  transform(n: number): string {
    if (n > 60 && n < 1440) {
      return Math.round(n / 60) + ' hours ago';
    } else if (n > 1440) {
      return Math.round(n / 1440) + ' days ago';
    } else {
      return Math.round(n) + ' minutes ago';
    }
  }
}
