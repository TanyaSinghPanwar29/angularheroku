import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private backendService: BackendServiceService ){}
  zopperForm : FormGroup;
  title = 'zopper';
  successfulSubmission: string = '';
  searchType: string = '';
  private emailPattern: RegExp = /^[\w-]+(\.[\w-]+)*@([A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*?\.[A-Za-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

  ngOnInit(){
    this.buildForm();
  }

  buildForm = () => {
    this.zopperForm = new FormGroup({
      "name" : new FormControl("",Validators.required),
      "search" :new FormControl('', Validators.required),
    "searchInput": new FormControl('', Validators.required)
   })
  }
  submitForm = () => {
    this.zopperForm.markAsTouched();
    this.zopperForm.markAsDirty();
    if(this.zopperForm.invalid)
    return;
    let body = {
      name : this.zopperForm.value.name,
      search : this.zopperForm.value.search,
      searchInput : this.zopperForm.value.searchInput
    }
    
    this.backendService.submit(body).subscribe(res => {
      this.successfulSubmission = "Details Successfully Submitted";
      this.zopperForm.reset();
    })
  
    console.log(this.zopperForm.value)
  }

  getErrorMessage = (control, fieldName) => {
    let value = control.value;
    if((control.touched || control.dirty) && (value+"").length === 0 && control.invalid)
    return fieldName + " is required";

    if((control.touched || control.dirty) && control.invalid)
    return fieldName + " is invalid";
  }

  validateSearchInput = (event) => {
    let value = event.target.value +"";
    if(value.length > 9  && this.searchType === 'number'){
      event.preventDefault();
      return false;
    }
  }

  switchSearchType = (event) => {
    let type = event.target.value;
    if(!type)
    return;
    this.zopperForm.get('searchInput').clearValidators();
    this.searchType = type === 'phone' ? 'number' : 'email';
    if(type === 'email'){
      this.zopperForm.get('searchInput').setValidators([Validators.required,Validators.pattern(this.emailPattern)]);
    } else if(type === 'phone'){
      this.zopperForm.get('searchInput').setValidators([Validators.required]);
    }
    this.zopperForm.get('searchInput').updateValueAndValidity();
    this.zopperForm.get("searchInput").setValue('');
  }

}


