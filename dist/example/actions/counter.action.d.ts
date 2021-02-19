export declare class CounterAction {
    private counter;
    private plugin;
    private step;
    constructor(counter?: number);
    countUp(): void;
    setSettings(count: number, step: number): void;
    private setTitle;
}
