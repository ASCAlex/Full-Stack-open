require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

// Creating Notes

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// HTTP Requests

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
            mongoose.connection.close()
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateID = () => {
    const maxID = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxID + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
        response.json(savedNote)
        mongoose.connection.close()
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = new Note( {
        content: body.content,
        important: body.important
    })

    Note.findByIdAndUpdate(request.params.id, note, {new: true})
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// choose environment variable or if undefined 3001 as PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)