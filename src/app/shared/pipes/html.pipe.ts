import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'html' })
export class HtmlPipe implements PipeTransform {
  transform(value: string) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = value;
    return tempElement.innerText;
  }
}
