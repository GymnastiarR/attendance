import { defineStore } from "pinia";
import axios from "axios";

export const useAttendanceStore = defineStore( 'attendance', {
    state: () => ( {
        attendances: [],
        attendance: {
            date: "",
            classId: "",
            students: []
        }
    } ),
    actions: {
        setAttendance( attendance ) {
            axios.post( '/presensi', attendance )
                .then( response => {
                    console.log( response.data );
                } )
                .catch( error => console.log( error ) );
        },

        createAttendance( date ) {
            axios.post( '/presensi', { date: date } )
                .then( response => {
                    this.getAttendances();
                } )
                .catch( error => console.log( error ) );
        },

        getAttendances() {
            axios.get( '/presensi' )
                .then( response => {
                    this.attendances = response.data.data;
                } )
                .catch( error => console.log( error ) );
        }
    }
} );