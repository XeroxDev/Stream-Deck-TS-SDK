/*
 * @author: XeroxDev <help@xeroxdev.de>
 * @copyright 2021.
 *
 */
import { StreamDeckPluginHandler } from '../abstracts/stream-deck-plugin-handler';
import { StateType } from '../interfaces/enums';

export class StreamDeckActionClass {
    private _autoSave: boolean = true;
    private _autoDebounce = true;
    private _settingsTimeoutId: number | undefined;
    private _action: string;
    private _context: string;
    private _device: string;
    private _settings: object | undefined;
    private _column: number;
    private _row: number;
    private _isInMultiAction: boolean = false;
    private _state: StateType;
    private _userDesiredState: StateType;

    constructor(private _handler: StreamDeckPluginHandler) {}

    /**
     * Sets the settings
     * @param {object | undefined} value
     */
    public set settings(value: object | undefined) {
        this._settings = value;
    }

    /**
     * The action's unique identifier.
     * If your plugin supports multiple actions, you should use this value to see which action was triggered.
     *
     * Gets the action
     * @returns {string}
     */
    public get action(): string {
        return this._action;
    }

    /**
     * The action's unique identifier.
     * If your plugin supports multiple actions, you should use this value to see which action was triggered.
     *
     * Sets the action
     * @param {string} value
     */
    public set action(value: string) {
        this._action = value;
    }

    /**
     * An opaque value identifying the instance's action.
     * You will need to pass this opaque value to several APIs like the setTitle API.
     *
     * Gets the context
     * @returns {string}
     */
    public get context(): string {
        return this._context;
    }

    /**
     * An opaque value identifying the instance's action.
     * You will need to pass this opaque value to several APIs like the setTitle API.
     *
     * Sets the context
     * @param {string} value
     */
    public set context(value: string) {
        this._context = value;
    }

    /**
     * An opaque value identifying the device.
     *
     * Gets the device
     * @returns {string}
     */
    public get device(): string {
        return this._device;
    }

    /**
     * An opaque value identifying the device.
     *
     * Sets the device
     * @param {string} value
     */
    public set device(value: string) {
        this._device = value;
    }

    /**
     * The coordinates column of the action triggered.
     *
     * Gets the column
     * @returns {number}
     */
    public get column(): number {
        return this._column;
    }

    /**
     * The coordinates column of the action triggered.
     *
     * Sets the column
     * @param {number} value
     */
    public set column(value: number) {
        this._column = value;
    }

    /**
     * The coordinates row of the action triggered.
     *
     * Gets the row
     * @returns {number}
     */
    public get row(): number {
        return this._row;
    }

    /**
     * The coordinates row of the action triggered.
     *
     * Sets the row
     * @param {number} value
     */
    public set row(value: number) {
        this._row = value;
    }

    /**
     * Boolean indicating if the action is inside a Multi Action.
     *
     * Gets the is in multi-action state
     * @returns {boolean}
     */
    public get isInMultiAction(): boolean {
        return this._isInMultiAction;
    }

    /**
     * Boolean indicating if the action is inside a Multi Action.
     *
     * Sets the is in multi-action state
     * @param {boolean} value
     */
    public set isInMultiAction(value: boolean) {
        this._isInMultiAction = value;
    }

    /**
     * This is a parameter that is only set when the action has multiple states defined in its manifest.json.
     * The 0-based value contains the current state of the action.
     *
     * Gets the state
     * @returns {StateType}
     */
    public get state(): StateType {
        return this._state;
    }

    /**
     * This is a parameter that is only set when the action has multiple states defined in its manifest.json.
     * The 0-based value contains the current state of the action.
     *
     * Sets the state
     * @param {StateType} value
     */
    public set state(value: StateType) {
        this._state = value;
    }

    /**
     * This is a parameter that is only set when the action is triggered with a specific value from a Multi Action.
     * For example if the user sets the Game Capture Record action to be disabled in a Multi Action,
     * you would see the value 1. Only the value 0 and 1 are valid.
     *
     * Gets the user desired state
     * @returns {StateType}
     */
    public get userDesiredState(): StateType {
        return this._userDesiredState;
    }

    /**
     * This is a parameter that is only set when the action is triggered with a specific value from a Multi Action.
     * For example if the user sets the Game Capture Record action to be disabled in a Multi Action,
     * you would see the value 1. Only the value 0 and 1 are valid.
     *
     * Sets the user desired state
     * @param {StateType} value
     */
    public set userDesiredState(value: StateType) {
        this._userDesiredState = value;
    }

    /**
     * Disables automatic save
     */
    public disableAutoSave() {
        this._autoSave = false;
    }

    /**
     * Disables automatic debounce
     */
    public disableAutoDebounce() {
        this._autoDebounce = false;
    }

    /**
     * Enables automatic save
     */
    public enableAutoSave() {
        this._autoSave = true;
    }

    /**
     * Enables automatic debounce
     */
    public enableAutoDebounce() {
        this._autoDebounce = true;
    }

    /**
     * Gets context settings
     * @template Settings your settings interface for autocomplete
     * @returns {Settings | undefined}
     */
    public getSettings<Settings = object>(): Settings | object | undefined {
        return this._settings;
    }

    /**
     * Gets the action
     * @returns {string}
     */
    public getAction(): string {
        return this._action;
    }

    /**
     * Gets the context
     * @returns {string}
     */
    public getContext(): string {
        return this._context;
    }

    /**
     * Gets the device
     * @returns {string}
     */
    public getDevice(): string {
        return this._device;
    }

    /**
     * Set context settings
     * @template Settings your settings interface for autocomplete
     * @param {Settings | object} settings
     * @param {number} ms for the debounce
     */
    public setSettings<Settings = object>(
        settings: Settings | object,
        ms: number = 0
    ) {
        this._settings = <object>settings;

        if (this._autoSave) this.saveSettings(ms);
    }

    /**
     * Set single or multiple attributes for settings
     * @param {object} attributes
     * @param {number} ms for the debounce
     */
    public setSettingsAttributes(attributes: object, ms: number = 0): void {
        const oldSettings = this.getSettings();
        if (oldSettings)
            this.setSettings({ ...oldSettings, ...attributes }, ms);
        else this.setSettings({ ...attributes }, ms);
    }

    /**
     * Save context settings
     * @param {number} ms for the debounce
     */
    public saveSettings(ms: number) {
        const fn = () => {
            this._handler.setSettings(this._settings, this._context);
        };

        if (this._autoDebounce) {
            this.debounceSettingsCall(fn, ms);
        } else {
            fn();
        }
    }

    /**
     * Settings call debounce method
     * @param {Function} fn
     * @param {number} ms
     * @private
     */
    private debounceSettingsCall(fn: Function, ms: number) {
        clearTimeout(this._settingsTimeoutId);

        this._settingsTimeoutId = setTimeout(fn, ms);
    }

    /**
     * Uses another instance of {@link StreamDeckActionClass} to update all
     * @internal
     * @private
     * @param {StreamDeckActionClass} self
     */
    public update(self: StreamDeckActionClass) {
        const {
            _action,
            _autoDebounce,
            _autoSave,
            _handler,
            _column,
            _context,
            _device,
            _isInMultiAction,
            _row,
            _settings,
            _state,
            _userDesiredState,
        } = self;

        this._action = _action ?? this._action;
        this._autoDebounce = _autoDebounce ?? this._autoDebounce;
        this._autoSave = _autoSave ?? this._autoSave;
        this._handler = _handler ?? this._handler;
        this._column = _column ?? this._column;
        this._context = _context ?? this._context;
        this._device = _device ?? this._device;
        this._isInMultiAction = _isInMultiAction ?? this._isInMultiAction;
        this._row = _row ?? this._row;
        this._settings = _settings ?? this._settings;
        this._state = _state ?? this._state;
        this._userDesiredState = _userDesiredState ?? this._userDesiredState;
    }
}
