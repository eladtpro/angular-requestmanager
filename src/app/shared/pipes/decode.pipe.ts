import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'decode' })
export class DecodePipe implements PipeTransform {
  transform(value: string, ...args: any[]): any {
    return decodeURIComponent(value.replace(/\+/gi, ' ')).replace(/\./g, '.');
  }
}
