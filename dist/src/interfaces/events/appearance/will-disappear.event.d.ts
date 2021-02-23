import { WillAppearEvent } from "./will-appear.event";
import { AcdData } from "../../acd-data";
export interface WillDisappearEvent<Settings = any> extends AcdData {
    event: 'willDisappear';
    payload: WillAppearEvent<Settings>['payload'];
}
