import { WillAppearEvent } from "./will-appear.event";
import { AcdData } from "../../acd-data";
export interface WillDisappearEvent extends AcdData {
    event: 'willDisappear';
    payload: WillAppearEvent['payload'];
}
