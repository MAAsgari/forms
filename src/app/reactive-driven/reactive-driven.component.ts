import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'reactive-driven',
  templateUrl: './reactive-driven.component.html',
  styleUrls: ['./reactive-driven.component.css']
})
export class ReactiveDrivenComponent implements OnInit {

  loginForm: FormGroup;
  genders = [
    'male',
    'female'
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'username': ['ali', [Validators.required, this.usernameLengthValidator]],
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['', Validators.required],
      'gender': ['male'],
      'hobbies': this.fb.array([['Cooking', Validators.required, this.asyncHobbyLnegthValidator]])
    });

    // this.loginForm = new FormGroup({
    //   'userData': new FormGroup({
    //     'username': new FormControl('ali', Validators.required),
    //     'email': new FormControl('', [
    //       Validators.required,
    //       Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
    //   }),
    //   'password': new FormControl('', Validators.required),
    //   'gender': new FormControl('male'),
    //   'hobbies': new FormArray([
    //     new FormControl('Cooking', Validators.required)])
    // });
    this.loginForm.valueChanges.subscribe(
      (data: any) => console.log(data));
    this.loginForm.statusChanges.subscribe(
      (data: any) => console.log(data)
    );
  }

  onDeleteHobby() {
    (<FormArray>this.loginForm.controls["hobbies"]).removeAt((<FormArray>this.loginForm.controls["hobbies"]).length - 1);
  }

  onAddHobby() {
    (<FormArray>this.loginForm.controls["hobbies"]).push(new FormControl('', Validators.required, this.asyncHobbyLnegthValidator));
  }
  onSubmit() {
    console.log(this.loginForm);
  }

  usernameLengthValidator(control: FormControl): { [s: string]: boolean } {
    if ((<string>control.value).length < 4 || (<string>control.value).length > 8) {
      return { lengthValidator: true };
    }
    return null;
  }

  asyncHobbyLnegthValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if ((<string>control.value).length < 4 || (<string>control.value).length > 8) {
            resolve({ 'invalid': true });
          } else {
            resolve(null);
          }
        }, 1500);
      });
    return promise;
  }



}
