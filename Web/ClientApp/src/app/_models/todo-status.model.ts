export class TodoStatusModel{
    id: number = null;
    isDone: boolean = null;

    // constructor being passed an object that gets bound to the properties of this instance.
    constructor(obj: TodoStatusModel = null) { if (obj) { Object.assign(this, obj); } }
}
