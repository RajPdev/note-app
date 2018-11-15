const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
	describe: 'Title of your note',
	demand: true,
	alias: 't'
}

const bodyOptions = {
	describe: 'Body of your note',
	demand: true,
	alias: 'b'
}


const argv = yargs
.command('add', 'To add a new note', { 
	title:titleOptions,
	body:bodyOptions
})
.command('list', 'List all notes')
.command('Read', 'Read a note', {
	title:titleOptions
})
.command('Remove', 'Remove a Note', {
	title:titleOptions
})
.help()
.argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  const allNotes = notes.getAll();
  console.log(`Number of notes are ${allNotes.length}!`);
  console.log('----')
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note){
  	notes.logNote(note)
} else {
	console.log('Note not found')
}
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note has been removed!' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
