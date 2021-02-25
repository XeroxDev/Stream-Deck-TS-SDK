/**
 * Data send from the applicationDidLaunch event
 * @category Event Data
 */
export interface ApplicationDidLaunchEvent {
    event: 'applicationDidLaunch',
    payload: {
        application: 'string'
    }
}
