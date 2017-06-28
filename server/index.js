import express from 'express';
import {find,insertOne,findcondition,remove} from './db/crud'
import mongodb_url from './config/mongodb_url'
import getConnect from './db/getConnect'
import bodyParser from 'body-parser'
const app = new express();
app.use(bodyParser.json());

//home
app.get('/api/mongodb/home',(req,res,next) => {
    getConnect(mongodb_url)
        .then(db => {
            return find(db,`home`,false)
                .then(doc => {
                    res.json(doc)
                })
        })
});
app.get('/api/mongodb/home/del/:id',(req,res,next) => {
    getConnect(mongodb_url)
        .then(db => {
            return remove(db,"home",{"id": Number(req.params.id)})
                 .then(doc => {
                    res.json(doc)
                })
        })
});
app.post('/api/mongodb/home/add',(req,res,next) => {
    // const {name, password} = req.body;
    getConnect(mongodb_url)
        .then(db => {
            return insertOne(db,`home`,req.body)
                .then(doc => {
                    res.json(doc)
                })
        })
})

//homelist
app.get('/api/mongodb/homelist',(req,res,next) => {
        const {id} = req.query;
        getConnect(mongodb_url)
            .then(db => {
                return findcondition(db,`homelist`,{id: Number(id)})
                    .then(doc => {
                        res.json(doc)
                    })
            })
});

app.post('/api/mongodb/homelist/add',(req,res,next) => {
    getConnect(mongodb_url)
        .then(db => {
            return insertOne(db,`homelist`,req.body)
                .then(doc => {
                    res.json(doc)
                })
        })
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});