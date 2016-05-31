import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Requests } from '../../api/schemas/request.js'
import '../../api/methods.js';
import "./makeOffers.html";

Template.makeOffers.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
});

Template.makeOffers.helpers({
  requests() {
    return Requests.find({});
  }
});

Template.makeOffers.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const price = Number(target.price.value);
    var requestId;
    if (target.requestId == Array) {
      for (var i in target.requestId) {

        if (target.requestId[i].checked) {
          requestId = String(target.requestId[i].value);
        }
      }
    } else {
      requestId = String(target.requestId.value);
    }

    Meteor.call('makeOffer', requestId, Meteor.userId(), price);
    target.reset();
  }
});
