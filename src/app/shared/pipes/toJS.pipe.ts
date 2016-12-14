import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toJS'
})
export class ImmutableToJsPipe implements PipeTransform {

  transform(value): any {
    return value.toJS();
  }

}
