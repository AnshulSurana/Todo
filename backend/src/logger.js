import { createLogger, format, transports, config } from 'winston';
const { combine, timestamp, splat, json} = format;

const Logger = createLogger({
    levels: config.syslog.levels,
    format: combine(
        timestamp(),
        splat(),
        json()
    ),
    transports: [new transports.Console()]
});

export default Logger;
