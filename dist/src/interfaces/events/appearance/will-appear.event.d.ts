import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
import { StateType } from "../../enums";
export interface WillAppearEvent extends AcdData {
    event: 'willAppear';
    payload: {
        settings: any;
        coordinates: Coordinates;
        state: StateType;
        isInMultiAction: boolean;
    };
}
