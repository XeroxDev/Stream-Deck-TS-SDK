export interface InitBase {
    port: string;
    uuid: string;
    registerEvent: string;
    info: InitEventInfo;
}
export interface InitPi<Settings = any> extends InitBase {
    actionInfo: InitEventActionInfo<Settings>;
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
export interface InitEventActionInfo<Settings = any> {
    action: string;
    context: string;
    device: string;
    payload: InitEventActionInfoPayload<Settings>;
}
export interface InitEventActionInfoPayload<Settings = any> {
    settings: Settings;
    coordinates: InitEventActionInfoPayloadCoordinates;
}
export interface InitEventActionInfoPayloadCoordinates {
    column: number;
    row: number;
}
