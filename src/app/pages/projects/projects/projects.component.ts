import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  data = [1,2,3,4,5];
  loading = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createProject(): void {
    this.router.navigate(['/projects/create'])
  }
}
