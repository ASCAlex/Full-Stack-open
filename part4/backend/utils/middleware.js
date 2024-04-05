const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'username must be longer than 3 characters' })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }

    next(error)
}

module.exports = {
    errorHandler
}