const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
   title:String,
   cat:String,
   userID:String
});

const NoteModel = mongoose.model('note',noteSchema);

module.exports = NoteModel;