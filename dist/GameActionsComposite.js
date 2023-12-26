export class GameActionComposite {
    actions = [];
    add(action) {
        this.actions.push(action);
    }
    remove(action) {
        const index = this.actions.indexOf(action);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }
    update(deltaTime) {
        this.actions.forEach((action) => action.update(deltaTime));
    }
    execute() {
        this.actions.forEach((action) => action.execute());
    }
}
