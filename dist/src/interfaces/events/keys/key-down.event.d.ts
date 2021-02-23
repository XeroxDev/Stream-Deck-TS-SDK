import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
import { StateType } from "../../enums";
export interface KeyDownEvent<Settings = any> extends AcdData {
    event: 'keyDown';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        state: StateType;
        userDesiredState: StateType;
        isInMultiAction: boolean;
    };
}
