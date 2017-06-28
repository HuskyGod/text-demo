export function find(db,table, condition = {}) {
    return new Promise((resolve, reject) => {
        const collection = db.collection(table);
        collection.find().toArray(function(err, docs) {
             if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
            db.close();
        })
    })
}

export function insertOne(db,table,condition = {}) {
    return new Promise((resolve, reject) => {
        const collection = db.collection(table);
        collection.insertOne(condition,function(err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
            db.close();
        })
    })
}

export function remove(db,table,condition = {}) {
    return new Promise((resolve, reject) => {
        const collection = db.collection(table);
        collection.removeOne(condition,function(err, docs) {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
            db.close();
        })
    })
}

export function findcondition(db,table,condition = {}) {
    return new Promise((resolve, reject) => {
        const collection = db.collection(table);
        collection.find(condition).toArray((err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        });
    });
}