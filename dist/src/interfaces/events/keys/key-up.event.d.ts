import { KeyDownEvent } from "./key-down.event";
import { AcdData } from "../../acd-data";
export interface KeyUpEvent extends AcdData {
    event: 'keyUp';
    payload: KeyDownEvent['payload'];
}
