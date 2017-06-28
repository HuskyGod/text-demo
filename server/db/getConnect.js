'use strict';
import {MongoClient} from 'mongodb';

const dbs = {}
const getConnect = (url) => {
    const db = dbs[url];
    if (db && db.serverConfig.isConnected()) {
        console.log("获取缓存db");
        return Promise.resolve(db)
    }
    return new Promise((resolve,reject) => {
        MongoClient.connect(url,(err,newDb) => {
            if(err) {
                reject(err)
            } else {
                dbs[url] = newDb;
                resolve(newDb)
            }
        })
    })
}
export default getConnect;