if (process.env.NODE_ENV !== 'production')
{
  require('dotenv').config()
}
const express = require('express')
// const { response, json } = require('express');
const Number = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
// const { query } = require('express')
// const express = require('express');
const app = express()


const PORT = process.env.PORT

morgan.token('body', function getBody (req){
  return JSON.stringify(req.body)
})
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (req,res)=> {
  res.send('welcome to the backend for phonebook.')
})

app.get('/api/persons', (req, res) => {
  Number.find({}).then(result => {
    res.json(result)
  })
    .catch(error => console.log(error.message))
})

app.get('/api/persons/info', (req,res) => {
  Number.countDocuments({} , (err, result) => {
    res.send(`The phone book has ${result} numbers now. ${new Date()}`)
  })
    .catch(error => console.log(error.message))})

app.get('/api/persons/:id', (req, res) => {
  Number.findById(req.params.id).then(result => {
    res.json(result)
  })
    .catch(error => console.log(error.message))
})




app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Number.findByIdAndRemove(id, () => { response.status(204).end()}).then(result => {
    // console.log('deleted');
  }).catch(error => next(error))
})



app.post('/api/persons', (req, res, next) => {
  let body = req.body;
  // console.log(body)
  const newNumber = new Number({
    name: body.name,
    number: body.number })
  newNumber.save().then(response => {
    res.send(response)
  }).catch (error => next(error))

})

app.put('/api/persons/:id', (req, res, next) => {
  console.log(req.body)
  const updatedInfo = {
    number: req.body.number }
  console.log(updatedInfo)
  Number.findByIdAndUpdate(req.params.id, updatedInfo, { runValidators: true, context: 'query', new: true })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})



const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === 'castError')
  {
    return response.status(404).send( { error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError')
  {
    // console.log(error.message)
    response.send(error.message)
  }
  next(error)
}

app.use(errorHandler);



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})