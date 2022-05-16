import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'form-error-manager',
  templateUrl: './form-error-manager.component.html',
  styleUrls: ['./form-error-manager.component.css']
})
export class FormErrorManagerComponent implements OnInit {

 @Input() controller: AbstractControl | null  = null;

  constructor() { }

  ngOnInit(): void {
  }

}
