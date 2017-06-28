/**
 * Created by xuan on 16/7/27.
 */
/**
 * 启动webpack开发服务器
 */
import fs from 'fs-extra';
import path from 'path';
import util from 'util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import opn from 'opn';
import pkg from '../package.json';
import config from '../webpack.config';

const host = pkg.devConfig.host;
const port = pkg.devConfig.port;

const compiler = webpack(config);
const server = new WebpackDevServer(
    compiler,
    Object.assign({
        setup: (app) => {
            app.use(WebpackHotMiddleware(compiler));
            app.use((req, res, next) => {
                    next();
            })
        }
    }, config.devServer)
);

server.listen(port, host, (err) => {
    if (err) {
        console.log(err);
    }
    const url = util.format('http://%s:%d', host, port);
    console.log('Listening at %s', url);
    opn(url);
});
