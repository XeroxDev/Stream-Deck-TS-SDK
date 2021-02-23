import { AcdData } from "../../acd-data";
import { Coordinates } from "../../coordinates";
export interface DidReceiveSettingsEvent<Settings = any> extends AcdData {
    event: 'didReceiveSettings';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        isInMultiAction: boolean;
    };
}
