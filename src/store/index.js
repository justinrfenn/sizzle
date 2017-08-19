import Vue from 'vue';
import Vuex from 'vuex';
import * as moment from 'moment'
import { sample } from '../testData/testSchedules'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    area: sample
  },
  getters: {
    area(state) {
      return state.area;
    }
  },
  mutations: {
    addMeeting(state, schedule, meeting) {
      if(isMeetingAvailable(schedule, meeting)){
        state.area.schedules.find(s => s.name == schedule.name).push(meeting);
      }
    }
  },
  actions: {
 
  }
});


function isMeetingAvailable(schedule, potentialMeeting) {
  
  return schedule.sessions.every(session => {
    console.log(session);
    return !moment(potentialMeeting.start, 'HH:mm').isBetween(moment(session.start, 'HH:mm'), moment(session.end, 'HH:mm')) 
      && !moment(potentialMeeting.end, 'HH:mm').isBetween(moment(session.start, 'HH:mm'), moment(session.end, 'HH:mm'));
  });
}