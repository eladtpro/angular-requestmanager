import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCamelCase'
})
export class TitleCamelCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (!value) return null;

    const result = value.replace( /([A-Z])/g, ' $1' );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
