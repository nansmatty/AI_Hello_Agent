import { loadEnv } from './config';
import { selectAndHello } from './provider';

async function main() {
	loadEnv();
	try {
		const result = await selectAndHello();
		// console.log(`Response from ${result.provider} (${result.model}): ${result.message}`);

		process.stdout.write(JSON.stringify(result, null, 2) + '\n');
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error('Error during hello process:', message);
		process.exit(1);
	}
}

main();
