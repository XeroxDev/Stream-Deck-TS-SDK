export interface SendToPluginEvent {
    action: string,
    event: 'sendToPlugin',
    context: string,
    payload: any
}
