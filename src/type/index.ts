// 搜索条件接口
export interface ParamProp {
  name: string;
  personId: Project['personId'];
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token?: string;
}

export interface Project {
  created: number;
  id: number;
  name: string;
  organization: string;
  personId: User['id'];
  pin: boolean;
}

export interface LoginOrRegisterParam {
  username: string;
  password: string;
}

export interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: Project['id'];
  // 任务组
  epicId: number;
  kanbanId: Kanban['id'];
  // bug or task
  typeId: TaskType['id'];
  note: string;
  tagId: number;
}

export interface Kanban {
  id: number;
  name: string;
  projectId: Project['id']
}

export interface TaskType {
  id: number; 
  name: string;
}


export interface ReOrderPorp {
  fromId: number;
  referenceId: number;
  type: 'before' | 'after';
  fromKanbanId?: number;
  toKanbanId?: number;
}

export interface Epic {
  id: number;
  name: string;
  projectId: Project['id'];
  start: number; // 开始时间
  end: number; // 结束时间
}