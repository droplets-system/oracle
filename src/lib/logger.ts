import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
	level: 'info',
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new transports.Console(),
		new transports.File({ filename: 'shared/error.log', level: 'error' })
	]
});
