
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warning=false;
  form:FormGroup=new FormGroup({
    userName: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });
  LoginModel= new Login();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,

    )
    {
      this.titleService.setTitle("Login");
    }

  ngOnInit(): void {

  }

  onSubmit() {
      if (this.form.invalid) {
          return;
      }

      this.LoginModel.userName=this.form.value.userName;
      this.LoginModel.password=this.form.value.password;

    this.router.navigate(["/outage"]);
    }





}
