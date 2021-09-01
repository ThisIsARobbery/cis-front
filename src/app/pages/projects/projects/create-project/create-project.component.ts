import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      projectName: [null, [Validators.required]],
      projectDescription: [null],
    });
  }

  submitForm(): void {
    const createProjectPayload = {
      name: this.validateForm.value.projectName,
      description: this.validateForm.value.projectDescription
    };
    console.log(createProjectPayload);
    this.router.navigate(['/projects']);
  }

}
