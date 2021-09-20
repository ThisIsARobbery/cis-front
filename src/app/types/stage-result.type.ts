import { Project } from './project.type';
import { Stage } from './stage.type';

export type StageResult = {
  _id?: string;
  stage: Stage;
  isDone: boolean;
  note?: string;
  project: Project;
  active?: boolean;
}
