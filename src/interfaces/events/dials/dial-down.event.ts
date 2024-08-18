import { AcdData } from '../../acd-data';
import { Coordinates } from '../../coordinates';
import { StateType } from '../../enums';

/**
 * Data send from the dialDown event
 * @category Event Data
 */
export interface DialDownEvent<Settings = any> extends AcdData {
    event: 'dialDown';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        state: StateType;
        userDesiredState: StateType;
        isInMultiAction: boolean;
    };
}
