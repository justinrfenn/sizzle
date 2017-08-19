<template>
  <v-container class="areaContainer">

    <v-expansion-panel expand v-for="(schedule, scheduleKey) in schedules" :key="scheduleKey" class="expansionPanel">
      <v-expansion-panel-content :class="[isScheduleAvailable(schedule) ? availableClass : busyClass] + ' expansionPanelContent'">
        <div slot="header">{{schedule.name}}</div>

        <v-list two-line>
          <template v-for="(session, index) in schedule.sessions">
            <v-list-tile :key="index">

              <v-list-tile-content>
                <v-list-tile-title>{{session.start +' - '+ session.end}}</v-list-tile-title>
                <v-list-tile-sub-title class="grey--text text--darken-4">{{session.organizer}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < schedule.sessions.length" :key="index"></v-divider>
          </template>
          <v-dialog absolute v-model="bookRoomDialog">
            <v-card>

              <!-- <v-flex xs6>
                <v-select v-bind:items="scheduleNames" v-model="selectedSchedule" label="Select" single-line bottom></v-select>
              </v-flex> -->

              <v-layout row wrap>
                <v-flex sm5 md12 lg4>
                  <v-time-picker v-model="endTime"></v-time-picker>
                </v-flex>
              </v-layout>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat primary @click.native="tryAddMeeting">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-expansion-panel-content>

    </v-expansion-panel>
    <v-btn fixed dark fab bottom right class="light-blue" @click.native.stop="bookRoomDialog = !bookRoomDialog">
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>

import { sample } from '../testData/testSchedules'
import * as moment from 'moment'

export default {
  name: 'area',
  components: {
  },
  data: function () {
    return {
      bookRoomDialog: false,
      endTime: null,
      selectedSchedule: 'Main Conference Room',
      busyClass: 'deep-orange darken-3 white--text text--lighten-4',
      availableClass: 'green lighten-1 white--text text--lighten-4'
    }
  },
  computed: {
    classObject(schedule) {
      console.log(schedule);
      let busyOrAvailableClass = this.isScheduleAvailable(schedule) ? this.availableClass : this.busyClass;
      return {
        busyOrAvailableClass: true
      }
    },
    schedules() {
      return this.$store.getters.area.schedules; //For testing purposes just use first area
    }
  },
  methods: {
    tryAddMeeting() {
      this.$store.commit('addMeeting', this.$store.getters.area.schedules.find(s => s.name == "Main Conference Room"), {organizer: "Albano Candidus", start: '00:30', end: '3:00'} );
      this.bookRoomDialog = false;
    },
    isScheduleAvailable(schedule) {
      console.log(schedule.sessions.length);
      return !schedule.sessions.some(session => {
        return moment().isBetween(moment(session.start, 'HH:mm'), moment(session.end, 'HH:mm'));
      });
    }
  }
};

//TODO: Hit api to get actual data
function getArea(route) {
  return sample;
}

</script>

<style>
.expansionPanel {
  margin: 10px;
}

.areaContainer {
  padding: 0;
  padding-right: 18px;
}
</style>
