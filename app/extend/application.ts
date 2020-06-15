const Transporter = Symbol('Application#transporter');

export default {
  get transporter() {
    if (!this[Transporter]) {
      // this 就是 app 对象，可以获取到 app 上的其他属性
      // this[Transporter] = this.nodemailer.create(this.config.nodemailer, this);
    }
    return this[Transporter];
  },
};
