import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../shared/services/auth.service";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../../shared/services/alertify.service";
import Swal from "sweetalert2";
import { Subscription } from "rxjs/internal/Subscription";

declare var $;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs: Subscription;

  loginForm: FormGroup = this.formBuilder.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    $(function() {
      $("input").iCheck({
        checkboxClass: "icheckbox_square-blue",
        radioClass: "iradio_square-blue",
        increaseArea: "20%" /* optional */
      });
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.loginForm);
    this.subs = this.authService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          // this.alertify.success('logged in successfully');
          // if(data)
          this.loading = false;
          

          if (data.username === "admin") {
            console.log(data);
            this.router.navigate(["dashboard"]);
            Swal.fire({
              type: "success",
              title: "Welcome back!",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            this.loading = false;
            Swal.fire({
              type: "error",
              title: "This is restricted area!",
              showConfirmButton: false
            });
            this.router.navigate(["login"]);
          }
        },
        err => {
          this.loading = false;
          Swal.fire({
            type: "error",
            title: "Wrong username or password!",
            showConfirmButton: false,
            timer: 2500
          });
          // this.alertify.error('Wrong username or password');
          console.log("data not sent");
        }
      );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
