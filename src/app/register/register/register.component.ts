import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Validators,  FormGroup, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MembersService} from '../../shared/services/members.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  members =[];
  registerForm:FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    first_name: ['',  Validators.required],
    other_names: ['',  Validators.required],
    password: ['',  Validators.required],
    email: ['',  Validators.required],
    phone: ['',  Validators.required],
    gender: ['',  Validators.required],
    occupation: ['',  Validators.required],
    location: ['',  Validators.required],
    ministry :this.formBuilder.group({
      street: [''],
      houseNumber: ['']
  }),
    marital_status: ['',  Validators.required],
    age: ['',  Validators.required]
  });


  constructor(private router: Router, private formBuilder: FormBuilder,
    private memberService: MembersService) { }

  ngOnInit() {
  
  }
  get f() { return this.registerForm.controls; }

  //submiting registration form for members 
  register(){
    this.submitted = true;

        // stop here if form is invalid
        // if (this.registerForm.invalid) {
        //     return;
        // }
  console.log(this.registerForm,'submitting form');
    this.loading = true;
    this.memberService.register(this.registerForm.value)
         .pipe(first())
         .subscribe(
             data=> {      
                    this.router.navigate(['/login']);
                },
                error => {
                    this.loading = false;
                });
    }

  login() {
    this.router.navigate(['']);
  }
}
