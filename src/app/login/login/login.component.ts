import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service'
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../shared/services/alertify.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['',  Validators.required]
  });
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private formBuilder: FormBuilder,private authService:AuthService, private route: ActivatedRoute,
    private router: Router, private alertify:AlertifyService ) { }

  ngOnInit() {
    
    $(function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }
  onSubmit(){
    this.submitted = true;
//     if (this.loginForm.invalid) {
//       return;
// }
    this.loading = true;
    console.log(this.loginForm);
    this.authService.login(this.f.username.value,this.f.password.value).subscribe(data=>{
        // this.alertify.success('logged in successfully');
              this.router.navigate(['dashboard']);
    },
    err=>{
      // this.alertify.error('Wrong username or password');
      console.log('data not sent');
    })
  }
}
