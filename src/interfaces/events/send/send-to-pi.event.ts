export interface SendToPiEvent {
    action: string,
    event: 'sendToPropertyInspector',
    context: string,
    payload: any
}
