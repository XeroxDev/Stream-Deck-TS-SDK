import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
export interface DidReceiveSettingsEvent extends AcdData {
    event: 'didReceiveSettings';
    payload: {
        settings: any;
        coordinates: Coordinates;
        isInMultiAction: boolean;
    };
}
