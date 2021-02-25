import {AcdData}     from '../../acd-data';
import {Coordinates} from '../../coordinates';

/**
 * Data send from the didReceiveSettings event
 * @category Event Data
 */
export interface DidReceiveSettingsEvent<Settings = any> extends AcdData {
    event: 'didReceiveSettings',
    payload: {
        settings: Settings,
        coordinates: Coordinates,
        isInMultiAction: boolean
    }
}
