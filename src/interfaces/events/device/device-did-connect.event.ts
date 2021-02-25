import {DeviceType} from '../../enums';

/**
 * Data send from the deviceDidConnect event
 * @category Event Data
 */
export interface DeviceDidConnectEvent {
    event: 'deviceDidConnect'
    device: string,
    deviceInfo: {
        name: string,
        type: DeviceType | number,
        size: {
            columns: number,
            rows: number
        }
    }
}
