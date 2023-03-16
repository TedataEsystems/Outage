import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/model/Iuser';
import { Login } from 'src/app/model/login';
import { AccountService } from '../../service/account.service';
import { NotificationmsgService } from '../../service/notificationmsg.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warning = false;
  form: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)

  });
  LoginModel = new Login();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private AccountService: AccountService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.titleService.setTitle("Login");
  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    setInterval(() => {
      this.AccountService.logout();
    }, 3600000);
    this.LoginModel.userName = this.form.value.userName;
    this.LoginModel.password = this.form.value.password;
    this.AccountService.login(this.LoginModel).subscribe(res => {
      if (res.status) {
        localStorage.setItem("tokenNumber", res.token);
        localStorage.setItem("userName", res.userName);
        localStorage.setItem("userGroup",res.userGroup);
        this.router.navigate(["/outage"]);
      }
      else {
        this.warning = true;
      }
    }, err => {
      this.warning = true;

    });


  }
}
