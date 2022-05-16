import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatError'
})
export class FormatErrorPipe implements PipeTransform {

  transform(value: any): string {
    let rvalue: string = '';
    if (value !== null) {
      console.log(value);
        if (value.required!=null) {
            rvalue = 'Campo obbligatorio!';
        }

        if (value.pattern!=null) {
          rvalue = 'La password deve contenere almeno una lettera maiuscola, un numero, un carattere speciale e deve essere di 8 caratteri!';
        }

        if (value.minlength!=null) {
          rvalue = `La password deve contenere almeno ${value.minlength.requiredLength} caratteri. Caratteri inseriti attualmente : ${value.minlength.actualLength} `;
        }

        if (value.mustMatch!=null) {
          rvalue = 'Le due password non combaciano';
        }

        if (value.email!=null) {
          rvalue = 'Inserire un e-mail valida!';
        }
        
    }
    return rvalue;
}

}
