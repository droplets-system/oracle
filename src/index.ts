import { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } from 'toad-scheduler';
import { epochCommit } from './tasks/commit';
import { logger } from './lib/logger';

import { Database } from 'bun:sqlite';
import { epochReveal } from './tasks/reveal';

export const db = new Database(`shared/epoch.${process.env.ACCOUNT_NAME}.sqlite`);
const scheduler = new ToadScheduler();

function main() {
	logger.info('Starting drops oracle service');

	// Create and submit commit values for each epoch
	const epochCommitter = new AsyncTask('epoch-commit', epochCommit, (error) => logger.error(error));
	const epochCommitterJob = new SimpleIntervalJob(
		// { minutes: 30, runImmediately: true },
		{ seconds: 10, runImmediately: true },
		epochCommitter
	);
	scheduler.addSimpleIntervalJob(epochCommitterJob);

	// Submit reveal values for each epoch
	const epochRevealer = new AsyncTask('epoch-reveal', epochReveal, (error) => logger.error(error));
	const epochRevealerJob = new SimpleIntervalJob(
		// { minutes: 30, runImmediately: true },
		{ seconds: 10, runImmediately: true },
		epochRevealer
	);
	scheduler.addSimpleIntervalJob(epochRevealerJob);
}

function ensureExit(code: number, timeout = 3000) {
	process.exitCode = code;
	setTimeout(() => {
		scheduler.stop();
		db.close();
		process.exit(code);
	}, timeout);
}

process.once('uncaughtException', (error) => {
	console.error(error, 'Uncaught exception');
	ensureExit(1);
});

main();
