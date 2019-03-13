import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'match'
})
export class MatchPipe implements PipeTransform {
  transform(value: any, pattern: string): any {
    if(value && pattern)
      if(JSON.stringify(value).indexOf(pattern) > -1)
        return value;
    return null;
  }
}
