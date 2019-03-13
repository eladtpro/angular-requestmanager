import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'mark',
  pure: false //recalculate on change - may couse to performance issue if missly used
})

export class MarkPipe implements PipeTransform {
  transform(value: any, pattern: string) {

    if(!value || !pattern || value.length < 1)
      return value

    if (value instanceof Array) {
      const valueReplaced:string = JSON.stringify(value).replace(pattern,'<mark>' + pattern + '</mark>');
      return JSON.parse(valueReplaced);
    }
    return value = value.replace(pattern,'<mark>' + pattern + '</mark>');
  }
}
