import { KeyDownEvent } from "./key-down.event";
import { AcdData } from "../../acd-data";
export interface KeyUpEvent<Settings = any> extends AcdData {
    event: 'keyUp';
    payload: KeyDownEvent<Settings>['payload'];
}
