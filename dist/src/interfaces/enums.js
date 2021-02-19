"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = exports.StateType = exports.TargetType = exports.DeviceType = void 0;
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["StreamDeck"] = 0] = "StreamDeck";
    DeviceType[DeviceType["StreamDeckMini"] = 1] = "StreamDeckMini";
    DeviceType[DeviceType["StreamDeckXL"] = 2] = "StreamDeckXL";
    DeviceType[DeviceType["StreamDeckMobile"] = 3] = "StreamDeckMobile";
    DeviceType[DeviceType["CorsairGKeys"] = 4] = "CorsairGKeys";
})(DeviceType = exports.DeviceType || (exports.DeviceType = {}));
var TargetType;
(function (TargetType) {
    TargetType[TargetType["BOTH"] = 0] = "BOTH";
    TargetType[TargetType["HARDWARE"] = 1] = "HARDWARE";
    TargetType[TargetType["SOFTWARE"] = 2] = "SOFTWARE";
})(TargetType = exports.TargetType || (exports.TargetType = {}));
var StateType;
(function (StateType) {
    StateType[StateType["ON"] = 0] = "ON";
    StateType[StateType["OFF"] = 1] = "OFF";
})(StateType = exports.StateType || (exports.StateType = {}));
var EventType;
(function (EventType) {
    EventType[EventType["ALL"] = 0] = "ALL";
    EventType[EventType["PI"] = 1] = "PI";
    EventType[EventType["PLUGIN"] = 2] = "PLUGIN";
    EventType[EventType["NONE"] = 3] = "NONE";
})(EventType = exports.EventType || (exports.EventType = {}));
