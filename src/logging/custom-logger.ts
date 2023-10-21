
import * as winston from 'winston';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'blue',
  debug: 'gray',
};

const winstonLogger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

winston.addColors(logColors);

export class CustomLogger {
  static error(message: string, context: string) {
    winstonLogger.log({ level: 'error', message, context });
  }

  static warn(message: string, context: string) {
    winstonLogger.log({ level: 'warn', message, context });
  }

  static info(message: string, context: string) {
    winstonLogger.log({ level: 'info', message, context });
  }

  static verbose(message: string, context: string) {
    winstonLogger.log({ level: 'verbose', message, context });
  }

  static debug(message: string, context: string) {
    winstonLogger.log({ level: 'debug', message, context });
  }

  // Add the following methods to also log to the default Nest.js logger
  static log(message: string, context: string) {
    winstonLogger.log({ level: 'info', message, context });
  }

  static verboseDefault(message: string, context: string) {
    winstonLogger.log({ level: 'verbose', message, context });
  }
}
