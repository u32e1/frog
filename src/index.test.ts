import { test, assert } from 'vitest';
import { hello } from './index';

test('hello', () => {
	assert(hello(), 'world');
});
