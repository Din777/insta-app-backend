const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

module.exports = {
    query,
    remove,
    add,
    update
}

async function query(filterBy = {}) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('post')

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
        // const store = asyncLocalStorage.getStore()
        const collection = await dbService.getCollection('post')
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
        const collection = await dbService.getCollection('post')
        const res = await collection.insertOne(post)
        return res.ops[0];
    } catch (err) {
        throw err
    }
}

async function update(post) {
    // console.log('enterrr update posts.service backend')
    try {
        const { imgUrl, title, createdAt, user, comments, likes } = post;
        // console.log('postsService- before postToSave');
        const postToSave = {
            _id: ObjectId(post._id),
            imgUrl,
            title,
            createdAt,
            user,
            comments,
            likes
        }
        // console.log('posts.service postToSave:', postToSave);
        // const store = asyncLocalStorage.getStore()
        const collection = await dbService.getCollection('post')
        await collection.updateOne({ '_id': postToSave._id }, { $set: postToSave })
        // console.log('posts.service postToSave-after:', postToSave);
        return postToSave;
    } catch (err) {
        logger.error(`cannot update post ${post._id}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}




