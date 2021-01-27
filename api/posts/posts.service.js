const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('posts')
       
        // const reviews = await collection.find(criteria).toArray()
        var posts = await collection.find({}).toArray()
     
        return posts
    } catch (err) {
        // logger.error('cannot find posts', err)
        throw err
    }
}

async function remove(postId) {
    try {
        const store = asyncLocalStorage.getStore()
        const collection = await dbService.getCollection('posts')
        console.log('postId', postId)
        const query = { _id: ObjectId(postId) }
        await collection.deleteOne(query)
    } catch (err) {
        throw err
    }
}


async function add(post) {
    console.log('enter posts.service backend');
    try {
        const collection = await dbService.getCollection('posts')
        const res = await collection.insertOne(post)
        return res.ops[0];
    } catch (err) {
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    remove,
    add
}


