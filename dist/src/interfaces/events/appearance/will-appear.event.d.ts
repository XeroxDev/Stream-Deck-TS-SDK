import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
import { StateType } from "../../enums";
export interface WillAppearEvent<Settings = any> extends AcdData {
    event: 'willAppear';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        state: StateType;
        isInMultiAction: boolean;
    };
}
