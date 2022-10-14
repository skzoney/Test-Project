const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/mydb"
mongoose.connect(url, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
