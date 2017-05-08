import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
  user = {
    username: 'Mohammadali',
    email: 'ma66.asgari@gamil.com',
    password: '123456',
    genders: "male"
  };

  genders = [
    "male",
    "female"
  ];
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    //console.log(this.user);
    console.log(form);//return form with all properties
    //console.log("on submit");
  }

}
