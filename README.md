# @u32e1/frog

The u32e1 SDK for Node.js.

## Usage

```typescript
/**
 * apiKey: string;
 * The key used to identify your project.
 * You can find this key in the project settings.
 *
 * secret: string;
 * The key used for the AES-128 encryption.
 */
const frog = new Frog({ apiKey: 'abc...', secret: 'abc...' });
const log = new frog.Area('sign_up');

try {
	await insertUserIntoDatabase(user);
	log.info('A new user signed up! Their email is', user.email);
} catch (error) {
	log.error('An error occured :(', error);
}
```
