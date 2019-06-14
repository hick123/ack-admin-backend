import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContributionService } from 'src/app/shared/services/contribution.service';
import { first } from 'rxjs/internal/operators/first';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-contribution',
  templateUrl: './add-contribution.component.html',
  styleUrls: ['./add-contribution.component.css']
})
export class AddContributionComponent implements OnInit {
  addContributionForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private contributionService:ContributionService) { }

  ngOnInit() {
    this.form();
  }
  form(){
    this.addContributionForm = this.formBuilder.group({
      member_number:['', Validators.required ],
      amount: ['',  Validators.required],
      description: ['',  Validators.required],
      contribution_date: ['',  Validators.required],
    });
  }

  get f() { return this.addContributionForm.controls; }

  addContribution(){
    this.submitted=true;
    this.loading = true;
    console.log(this.addContributionForm.value);
    this.contributionService.addContribution(this.addContributionForm.value)
         .pipe(first())
         .subscribe(
             data=> { 
              Swal.fire({
                type: 'success',
                title: 'You have succefully added contribution!',
                showConfirmButton: false,
                timer: 2500
              });   
              this.addContributionForm.reset();
              console.log(data)
                },
                error => {
                  this.loading = false;

                  Swal.fire({
                    type: 'error',
                    title: 'Could not add contribution, member does not exist or member is not activated!',
                    showConfirmButton: false
                    });
                });
  }
}
