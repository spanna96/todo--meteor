import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './body.html';
import { insertItem, deleteItem, setItemDone, editItem } from './helpers'
import { ReactiveVar } from 'meteor/reactive-var';

Template.body.helpers({
  tasks() {
    Tasks.find({}).forEach((element, i) => {
      console.log(`task ${i}`, element.text);
    });
    return Tasks.find({}, { sort: { createdAt: - 1 } });
  },

});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    insertItem(event, Tasks)
  },
  'click .delete'() {
    deleteItem(Tasks, this._id)
  },
  'click .toggle-checked'() {
    setItemDone(Tasks, this)
  },
});

Template.task.helpers({
  isEditing() {
    return Session.get(`isEditing_${this._id}`)
  },
})

Template.task.events({
  "dblclick .itemText"(){
    Session.set( `isEditing_${this._id}`, true); 
  },
  "keypress .editText"(event){
    if (event.which===13) {
      editItem(event, Tasks, this)
    Session.set( `isEditing_${this._id}`, false ); 
    }
  }
})
