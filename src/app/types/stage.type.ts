export type StageOption = {
  name: string;
  stageRef: string;
}

export type Stage = {
  _id?: string;
  number: number;
  title: string;
  description?: string;
  actor: string;
  isConditional: boolean;
  priority: string;
  options?: StageOption[];
}
