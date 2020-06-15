import { Context } from 'egg';

export default {
  success(data?: any) {
    const ctx = this as Context;
    ctx.body = {
      success: true,
      data,
    };
  },
  error(err: any) {
    const ctx = this as Context;
    ctx.body = {
      success: false,
      errorMessage: ctx.helper.getErrorMessage(err),
    };
  },
};
