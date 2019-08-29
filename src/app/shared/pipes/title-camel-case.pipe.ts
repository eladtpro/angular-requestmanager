import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'title'
})
export class TitleCamelCasePipe extends TitleCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return null;

    return super.transform(value.replace(/_/g, ' '));
    // const result = value.replace( /([A-Z])/g, ' $1' );
    // return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
