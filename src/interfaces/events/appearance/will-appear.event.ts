import { AcdData } from '../../acd-data';
import { Coordinates } from '../../coordinates';
import { StateType } from '../../enums';

/**
 * Data sent from the willAppear event
 * @category Event Data
 */
export interface WillAppearEvent<Settings = any> extends AcdData {
    event: 'willAppear';
    payload: {
        settings: Settings;
        coordinates: Coordinates;
        state: StateType;
        isInMultiAction: boolean;
    };
}
