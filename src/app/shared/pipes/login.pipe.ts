import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'login'
})
export class LoginPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (!value) return null;

    return value.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  }
}
