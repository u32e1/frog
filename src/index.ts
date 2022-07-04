import { Fish } from '@u32e1/fish';
import fetch from 'node-fetch';

export interface FrogConfig {
	/**
	 * The key used to identify your project.
	 * You can find this key in the project settings.
	 */
	apiKey: string;
	/**
	 * The key used for the AES-128 encryption.
	 */
	secret: string;
}

enum LogType {
	Info = 0,
	Warning = 1,
	Error = 2,
}

const API_URL = 'https://27363.u32e1.com/';

class FrogArea {
	private readonly fish: Fish;

	constructor(private config: FrogConfig, private areaName: string) {
		this.fish = new Fish(config.secret);
	}

	private joinPieces(pieces: unknown[]) {
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

	private async send({
		area,
		content: _content,
		type,
	}: {
		area: string;
		content: string;
		type: LogType;
	}) {
		const content = this.fish.encrypt(_content);

		await fetch(API_URL, {
			method: 'post',
			headers: {
				'X-API-Key': this.config.apiKey,
			},
			body: JSON.stringify({ area, content, type }),
		});
	}

	public async info(...pieces: unknown[]) {
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
export class Frog {
	constructor(private config: FrogConfig) {}

	/**
	 * @example
	 * ```typescript
	 * const frog = new Frog(...);
	 * const log = new frog.Area('sign-up');
	 * ```
	 */
	public Area = FrogArea.bind(this, this.config) as {
		new (...args: [ConstructorParameters<typeof FrogArea>[1]]);
	};
}
