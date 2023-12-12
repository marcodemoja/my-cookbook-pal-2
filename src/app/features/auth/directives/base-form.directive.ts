import { Directive, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appBaseForm]',
  standalone: true
})
export abstract class BaseFormDirective {

  @Input()
  form!: FormGroup;

  @Output()
  submit = new EventEmitter<boolean>();

  onSubmit() {
    this.submit.emit(true)
  }

}
