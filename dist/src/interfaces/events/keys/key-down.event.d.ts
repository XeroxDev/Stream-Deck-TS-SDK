import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
import { StateType } from "../../enums";
export interface KeyDownEvent extends AcdData {
    event: 'keyDown';
    payload: {
        settings: any;
        coordinates: Coordinates;
        state: StateType;
        userDesiredState: StateType;
        isInMultiAction: boolean;
    };
}
