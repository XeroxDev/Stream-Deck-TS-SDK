import { DeviceType } from "../../enums";
export interface DeviceDidConnectEvent {
    event: 'deviceDidConnect';
    device: string;
    deviceInfo: {
        name: string;
        type: DeviceType | number;
        size: {
            columns: number;
            rows: number;
        };
    };
}
