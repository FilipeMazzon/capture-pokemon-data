const Db = require('./database');
const assert = require('assert');

class genericDAO {
    insert = async (pokemon, collectionName) => {
        const db = await Db.get();
        const r = await db.collection(collectionName).insertOne(pokemon);
        assert(1, r.insertedCount);
        return pokemon;
    }
    getAll = async (collectionName, filter, limit = 1000) => {
        const db = await Db.get();
        return db.collection(collectionName).find(filter).limit(limit).sort({id: 1}).toArray();
    }
    createIndexUnique = async (collectionName, _key) => {
        const db = await Db.get();
        return db.collection(collectionName).createIndex("id", {unique: true});
    }
    insertAll = async (objects, collectionName) => {
        const db = await Db.get();
        const r = await db.collection(collectionName).insertMany(objects);
        assert(objects.length, r.insertedCount);
        return r;
    }
}


module.exports = new genericDAO();