import type { NextApiRequest } from 'next/types';
import pino from 'pino';

const $logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'trace' : 'info',
  transport: {
    target: 'pino-pretty',
  },
});

interface BaseLogObject {
  body?: object;
}

interface ApiLogObject extends BaseLogObject {
  req: {
    method?: string;
    path?: string;
  };
}

type ErrorType = 'BadRequest' | 'Not Found' | 'Internal Error' | 'Unauthorized' | 'Forbidden' | 'Method Not Allowed';

function baseFormatter(obj?: object): BaseLogObject | undefined {
  return obj ? { body: obj } : undefined;
}

function apiFormatter(req: NextApiRequest, obj?: object): ApiLogObject {
  if (obj) {
    return {
      req: {
        method: req.method,
        path: req.url,
      },
      body: obj,
    };
  }
  return {
    req: {
      method: req.method,
      path: req.url,
    },
  };
}

export class Logger {
  protected protected() {}

  static fatal(type: ErrorType, req: NextApiRequest, error?: Error | unknown, values?: object): void {
    if (error instanceof Error) {
      $logger.fatal(apiFormatter(req, { error: `${error.name}:${error.message}`, values }), type);
    } else {
      $logger.fatal(apiFormatter(req, { values }), type);
    }
  }

  static error(type: ErrorType, req: NextApiRequest, error?: Error | unknown, values?: object): void {
    if (error instanceof Error) {
      $logger.error(apiFormatter(req, { error: `${error.name}:${error.message}`, values }), type);
    } else {
      $logger.error(apiFormatter(req, { values }), type);
    }
  }

  static warn(message: string, req: NextApiRequest, obj?: object): void {
    $logger.warn(apiFormatter(req, obj), message);
  }

  static info(message: string, req: NextApiRequest, obj?: object): void {
    $logger.info(apiFormatter(req, obj), message);
  }

  static _info(message: string, obj?: object): void {
    $logger.info(baseFormatter(obj), message);
  }

  static debug(message: string, req: NextApiRequest, obj?: object): void {
    $logger.debug(apiFormatter(req, obj), message);
  }

  static _debug(message: string, obj?: object): void {
    $logger.debug(baseFormatter(obj), message);
  }

  static trace(message: string, req: NextApiRequest, obj?: object): void {
    $logger.trace(apiFormatter(req, obj), message);
  }

  static _trace(message: string, obj?: object): void {
    $logger.trace(baseFormatter(obj), message);
  }
}
