import { StreamDeckAction } from "../../src/abstracts/stream-deck-action";
import { Counter } from "../counter";
export declare class CounterAction extends StreamDeckAction<Counter, CounterAction> {
    private plugin;
    private actionName;
    private keyUpTimer;
    constructor(plugin: Counter, actionName: string);
    private onAppear;
    private onKeyUp;
    private onKeyDown;
    private onSettings;
}
