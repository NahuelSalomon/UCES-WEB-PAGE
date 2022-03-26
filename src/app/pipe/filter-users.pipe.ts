import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPost = [];
    for (const user of value){
      if(user.firstname.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          user.lastname.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          user.email.toLowerCase().indexOf(arg.toLowerCase()) > -1
        ){
        resultPost.push(user);
      }
    }
    return resultPost;
  }

}
