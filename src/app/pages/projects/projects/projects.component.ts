import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';

import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  loading = false;
  projects: any[] = [];


  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.refreshProjectList();
  }

  refreshProjectList(): void {
    this.projectsService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  createProject(): void {
    this.router.navigate(['/projects/create'])
  }

  showDeleteConfirm(projectId: string): void {
    this.modal.confirm({
      nzTitle: 'Вы действительно хотите удалить проект?',
      nzContent: '<b style="color: red">Прогресс по проекту будет утерян.</b>',
      nzOkText: 'Удалить',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteProject(projectId),
      nzCancelText: 'Отмена',
      nzOnCancel: () => {}
    })
  }

  goToProject(projectId: string): void {
    this.router.navigate(['/process', projectId]);
  }

  deleteProject(projectId: string): void {
    this.projectsService.deleteProject(projectId).subscribe((deleteResult: any) => {
      this.refreshProjectList();
    });
  }
}
