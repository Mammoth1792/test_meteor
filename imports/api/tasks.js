import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
    'tasks.insert'(text) {
      check(text, String);
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('Go away');
      }
   
      Tasks.insert({
        text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username,
      });
    },
    'tasks.remove'(taskId) {

      // Make sure the user is logged in before deleting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('Please log in to delete');
      }

      check(taskId, String);
   
      Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
      check(taskId, String);
      check(setChecked, Boolean);
   
      Tasks.update(taskId, { $set: { checked: setChecked } });
    },
  });