import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from '../../projects.service';

@Component({
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectsService: ProjectsService,
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
    this.projectsService.createProject(createProjectPayload).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/projects']);
    })
  }

}
