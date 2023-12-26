// GameModifierComposite.ts
export class GameModifierComposite {
    shouldApplyCondition = () => true;
    modifiers = [];
    update(deltaTime) {
        this.modifiers.forEach((modifier) => modifier.update(deltaTime));
    }
    setShouldApplyCondition(condition) {
        this.shouldApplyCondition = condition;
    }
    shouldApply() {
        return this.shouldApplyCondition();
    }
    apply() {
        this.modifiers.forEach((modifier) => {
            if (this.shouldApplyCondition() && modifier.shouldApply()) {
                modifier.apply();
            }
        });
    }
    addModifier(modifier) {
        this.modifiers.push(modifier);
    }
    removeModifier(modifier) {
        const index = this.modifiers.indexOf(modifier);
        if (index > -1) {
            this.modifiers.splice(index, 1);
        }
    }
}
