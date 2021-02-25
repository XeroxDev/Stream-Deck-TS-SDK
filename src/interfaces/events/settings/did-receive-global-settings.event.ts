/**
 * Data send from the didReceiveGlobalSettings event
 * @category Event Data
 */
export interface DidReceiveGlobalSettingsEvent<Settings = any> {
    event: 'didReceiveGlobalSettings',
    payload: {
        settings: Settings
    }
}
