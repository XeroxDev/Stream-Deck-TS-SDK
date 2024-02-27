import { AcdData } from '../../acd-data';
import { Coordinates } from '../../coordinates';
import { StateType } from '../../enums';

/**
 * Data send from the dialUp event
 * @category Event Data
 */
export interface DialUpEvent<Settings = any> extends AcdData {
    event: 'dialUp';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        state: StateType;
        userDesiredState: StateType;
        isInMultiAction: boolean;
    };
}
