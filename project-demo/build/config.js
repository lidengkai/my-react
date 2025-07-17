// @ts-check
const path = require('path');
const CONTEXT = process.cwd();
const { name, version } = require(path.join(CONTEXT, 'package.json'));
const mode = process.env.NODE_ENV;

module.exports.ENV_PRODUCTION = 'production';
module.exports.ENV_DEVELOPMENT = 'development';
module.exports.CONTEXT = CONTEXT;
module.exports.mode = mode;
module.exports.name = name;
module.exports.version = version;

module.exports.isDev = mode === module.exports.ENV_DEVELOPMENT;
module.exports.env = module.exports.isDev ? 'watch' : 'prod';

/** 接口 */
module.exports.apiList = {
  /** 调试环境 */
  watch: { api: '/api' },
  /** 生产环境 */
  prod: { api: '/api' },
};
