export class TodoModel{
    id: number = null;
    name: string = null;
    isDone: boolean = null;

    //constructor being passed an object that gets bound to the properties of this instance.
    constructor(obj: TodoModel = null) { if (obj) { Object.assign(this, obj); } }
}
