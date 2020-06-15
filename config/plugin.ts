import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};
plugin.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

export default plugin;
