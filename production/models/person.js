require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.DB_URL
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to database.'))
  .catch(error => console.log(error.message))
const numberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    number: {
      type: String,
      equired: true,
      unique: true,
      minlength: 8
    }
  })

numberSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

numberSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })
module.exports = mongoose.model('number', numberSchema)