"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(props) {
        this.describoHeaders = {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + props['token']
        };
        this.describoURL = props['describoURL'];
    }
}
exports.Config = Config;
