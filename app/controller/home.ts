import { Controller } from 'egg';
import validate, { Joi } from '../decorator/validate';

export default class HomeController extends Controller {
  @validate({
    query: Joi.object({
      ref: Joi.string().required(),
      forceUpdate: Joi.string().required(),
      projectId: Joi.string().required(),
    }).options({ allowUnknown: true }),
  })
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
