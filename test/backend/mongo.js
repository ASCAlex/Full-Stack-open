const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://scheickalex:${password}@cluster0.navyvdc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=noteApp`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({important: true}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

/*
const note = new Note({
    content: 'React is easy',
    important: true,
})

note.save().then(result => {
    console.log('note saved!')
    console.log(note)
    mongoose.connection.close()
})
*/