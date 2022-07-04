import { test, vi, expect, assert } from 'vitest';
import * as fetchModule from 'node-fetch';
import { Frog, LogType, API_URL } from './index';

vi.mock('node-fetch', () => {
	return {
		default: vi.fn(() => null),
	};
});
const fetchSpy = vi.spyOn(fetchModule, 'default');

const API_KEY = 'abc';

const frog = new Frog({ apiKey: API_KEY, secret: 'abc' });

test('info', () => {
	const log = new frog.Area('test');
	log.info('test');

	expect(fetchSpy).toHaveBeenCalledWith(API_URL, {
		method: 'post',
		headers: {
			'X-API-Key': API_KEY,
		},
		body: JSON.stringify({
			area: 'test',
			content: 'b9a8e4c1',
			type: LogType.Info,
		}),
	});
});

test('warning', () => {
	const log = new frog.Area('test');
	log.warning('test');

	expect(fetchSpy).toHaveBeenCalledWith(API_URL, {
		method: 'post',
		headers: {
			'X-API-Key': API_KEY,
		},
		body: JSON.stringify({
			area: 'test',
			content: 'b9a8e4c1',
			type: LogType.Warning,
		}),
	});
});

test('error', () => {
	const log = new frog.Area('test');
	log.error('test');

	expect(fetchSpy).toHaveBeenCalledWith(API_URL, {
		method: 'post',
		headers: {
			'X-API-Key': API_KEY,
		},
		body: JSON.stringify({
			area: 'test',
			content: 'b9a8e4c1',
			type: LogType.Error,
		}),
	});
});

test('different areas', () => {
	const log = new frog.Area('test');
	log.info('test');

	expect(fetchSpy).toHaveBeenCalledWith(API_URL, {
		method: 'post',
		headers: {
			'X-API-Key': 'abc',
		},
		body: JSON.stringify({
			area: 'test',
			content: 'b9a8e4c1',
			type: LogType.Info,
		}),
	});

	const log2 = new frog.Area('test2');
	log2.info('test');

	expect(fetchSpy).toHaveBeenCalledWith(API_URL, {
		method: 'post',
		headers: {
			'X-API-Key': 'abc',
		},
		body: JSON.stringify({
			area: 'test2',
			content: 'b9a8e4c1',
			type: LogType.Info,
		}),
	});
});
