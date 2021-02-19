export interface ApplicationDidLaunchEvent {
    event: 'applicationDidLaunch';
    payload: {
        application: 'string';
    };
}
