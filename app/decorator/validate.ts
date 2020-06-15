import * as Joi from '@hapi/joi';
import { Controller, Context } from 'egg';

interface ValidateOptions {
  headers?: Joi.AnySchema;
  query?: Joi.AnySchema;
  body?: Joi.AnySchema;
  output?: Joi.AnySchema;
  strictOutput?: boolean;
}

export { Joi };

export default (options?: ValidateOptions) => {
  return (target: Controller, name: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;

    if (typeof fn !== 'function') {
      throw new Error(`Bind validate error, please make sure ${target} - ${name} is function!`);
    }

    descriptor.value = function descriptor(...args: unknown[]) {
      const ctx = this['ctx'] as Context;
      const { query } = ctx;
      const { body, headers } = ctx.request;
      const { error: headersError } = options?.headers?.validate(headers) ?? {};
      if (headersError) {
        ctx.error(headersError);
        return;
      }

      const { error: queryError } = options?.query?.validate(query) ?? {};
      if (queryError) {
        ctx.error(queryError);
        return;
      }

      const { error: bodyError } = options?.body?.validate(body) ?? {};
      if (bodyError) {
        ctx.error(bodyError);
        return;
      }

      const result = (fn as Function).apply(this, args);

      const { error: outputError } = options?.body?.validate(ctx.body) ?? {};
      if (outputError) {
        ctx.logger.warn('Output validate error, please fix or check it! %s', outputError);
        if (options?.strictOutput) {
          ctx.error(outputError);
          return;
        }
      }

      return result;
    };

    return descriptor;
  };
};
