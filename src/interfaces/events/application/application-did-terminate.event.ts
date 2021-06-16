/**
 * Data send from the applicationDidTerminate event
 * @category Event Data
 */
export interface ApplicationDidTerminateEvent {
    event: 'applicationDidTerminate';
    payload: {
        application: 'string';
    };
}
