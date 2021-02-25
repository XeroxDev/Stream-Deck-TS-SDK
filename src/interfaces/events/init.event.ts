/**
 * @category Internal but public
 */
export interface InitBase {
    port: string,
    uuid: string,
    registerEvent: string,
    info: InitEventInfo
}

/**
 * @category Internal but public
 */
export interface InitPi<Settings = any> extends InitBase {
    actionInfo: InitEventActionInfo<Settings>
}

/**
 * @category Internal but public
 */
export interface InitEventInfo {
    application: InitEventInfoApplication,
    plugin: InitEventInfoPlugin,
    devicePixelRatio: number,
    devices: InitEventInfoDevice[]
}

/**
 * @category Internal but public
 */
export interface InitEventInfoApplication {
    language: string,
    platform: string,
    version: string
}

/**
 * @category Internal but public
 */
export interface InitEventInfoPlugin {
    version: string
}

/**
 * @category Internal but public
 */
export interface InitEventInfoDevice {
    id: string,
    name: string,
    size: InitEventInfoDeviceSize,
    type: number
}

/**
 * @category Internal but public
 */
export interface InitEventInfoDeviceSize {
    columns: number,
    rows: number
}

/**
 * @category Internal but public
 */
export interface InitEventActionInfo<Settings = any> {
    action: string,
    context: string,
    device: string,
    payload: InitEventActionInfoPayload<Settings>
}

/**
 * @category Internal but public
 */
export interface InitEventActionInfoPayload<Settings = any> {
    settings: Settings;
    coordinates: InitEventActionInfoPayloadCoordinates;
}

/**
 * @category Internal but public
 */
export interface InitEventActionInfoPayloadCoordinates {
    column: number;
    row: number;
}
