import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'html' })
export class HtmlPipe implements PipeTransform {
  transform(value: string) {
    const div: HTMLDivElement = document.createElement('div');
    const cls: Attr = document.createAttribute('class');
    cls.value = 'box';
    div.attributes.setNamedItem(cls);
    div.innerHTML = value;
    return div.innerText;
  }
}
