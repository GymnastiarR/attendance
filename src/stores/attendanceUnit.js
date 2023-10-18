import { defineStore } from "pinia";
import axios from "../axiosConfiguration";

export const useAttendanceUnitStore = defineStore( 'attendanceUnit', {
    state: () => ( {
        attendanceUnits: [],
        attendanceUnit: {
            name: "",
            identifier: ""
        }
    } ),

    actions: {
        getAttendanceUnits() {
            axios.get( '/unit-presensi' )
                .then( response => this.attendanceUnits = response.data.data )
                .catch( error => console.log( error ) );
        },

        store() {
            axios.post( '/unit-presensi', this.attendanceUnit )
                .then( () => {
                    this.attendanceUnit = {
                        name: "",
                        identifier: ""
                    };
                    this.getAttendanceUnits();
                } )
                .catch( error => console.log( error ) );
        },

        setClass( attendanceUnitId ) {
            axios.put( `/unit-presensi/${this.attendanceUnitId}/kelas` );
        }
    }
} );