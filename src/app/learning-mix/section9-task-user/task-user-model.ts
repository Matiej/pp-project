import { TaskUserStatus } from "./user-status-enum";

export class TaskUser {
    private _id!: number;
    public name: string;
    public status: TaskUserStatus;

    constructor(
        name: string,
        status: TaskUserStatus,
      ) {
        this.name = name;
        this.status = status;
      }
    
      get id(): number {
        return this._id;
      }
    
      set id(value: number) {
        this._id = value;
      }
}