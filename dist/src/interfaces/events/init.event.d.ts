export interface InitEvent {
    port: string;
    uuid: string;
    registerEvent: string;
    info: InitEventInfo;
    actionInfo?: InitEventActionInfo;
}
export interface InitEventInfo {
    application: InitEventInfoApplication;
    plugin: InitEventInfoPlugin;
    devicePixelRatio: number;
    devices: InitEventInfoDevice[];
}
export interface InitEventInfoApplication {
    language: string;
    platform: string;
    version: string;
}
export interface InitEventInfoPlugin {
    version: string;
}
export interface InitEventInfoDevice {
    id: string;
    name: string;
    size: InitEventInfoDeviceSize;
    type: number;
}
export interface InitEventInfoDeviceSize {
    columns: number;
    rows: number;
}
export interface InitEventActionInfo {
    action: string;
    context: string;
    device: string;
    payload: InitEventActionInfoPayload;
}
export interface InitEventActionInfoPayload {
    settings: any;
    coordinates: InitEventActionInfoPayloadCoordinates;
}
export interface InitEventActionInfoPayloadCoordinates {
    column: number;
    row: number;
}
