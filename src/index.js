"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frog = void 0;
const fish_1 = require("@u32e1/fish");
const node_fetch_1 = require("node-fetch");
var LogType;
(function (LogType) {
    LogType[LogType["Info"] = 0] = "Info";
    LogType[LogType["Warning"] = 1] = "Warning";
    LogType[LogType["Error"] = 2] = "Error";
})(LogType || (LogType = {}));
const API_URL = 'https://v1.logs.api.u32e1.com/';
class FrogArea {
    constructor(config, areaName) {
        this.config = config;
        this.areaName = areaName;
        this.fish = new fish_1.Fish(config.secret);
    }
    joinPieces(pieces) {
        const formattedPieces = [];
        for (const piece of pieces) {
            if (typeof piece === 'object') {
                formattedPieces.push(JSON.stringify(piece));
                continue;
            }
            formattedPieces.push(String(piece));
        }
        return formattedPieces.join(' ');
    }
    async send({ area, content: _content, type, }) {
        const content = this.fish.encrypt(_content);
        await (0, node_fetch_1.default)(API_URL, {
            method: 'post',
            headers: {
                'X-API-Key': this.config.apiKey,
            },
            body: JSON.stringify({ area, content, type }),
        });
    }
    async info(...pieces) {
        return await this.send({
            area: this.areaName,
            content: this.joinPieces(pieces),
            type: LogType.Info,
        });
    }
}
/**
 * @example
 * ```typescript
 * const frog = new Frog({ secret: 'abc...', apiKey: 'abc...' });
 * const log = new frog.Area('sign-up');
 * ```
 */
class Frog {
    constructor(config) {
        this.config = config;
        /**
         * @example
         * ```typescript
         * const frog = new Frog(...);
         * const log = new frog.Area('sign-up');
         * ```
         */
        this.Area = FrogArea.bind(this, this.config);
    }
}
exports.Frog = Frog;
