import { IncomingMessage } from 'http';

type ErrorLike = Error | string | IncomingMessage | { response: IncomingMessage };

type Asyncable<T, A> = PromiseLike<T> | ((...args: A[]) => PromiseLike<T>);

export default {
  getErrorMessage(err: ErrorLike) {
    if (typeof err === 'string') {
      return err;
    }

    if ('message' in err) {
      return err.message;
    }

    if ('statusMessage' in err) {
      return err.statusMessage;
    }

    if ('response' in err && 'statusMessage' in err.response) {
      return err.response.statusMessage;
    }

    return 'Server unknow error!';
  },

  // 错误优先回调 try catch
  async tc<T, A>(asyncFunc: Asyncable<T, A>, ...args: A[]) {
    type Result = [any, T | null];
    try {
      if (typeof asyncFunc === 'function') {
        return [null, await asyncFunc(...args)] as Result;
      }

      return [null, await asyncFunc] as Result;
    } catch (e) {
      return [e, null] as Result;
    }
  },
};
