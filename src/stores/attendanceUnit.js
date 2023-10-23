import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import { useSuccessStore } from "./success";

export const useAttendanceUnitStore = defineStore( 'attendanceUnit', {
    state: () => ( {
        attendanceUnits: [],
        attendanceUnit: {
            name: "",
            identifier: ""
        },
        assignUnit: {
            classId: "",
            unitId: ""
        }
    } ),

    actions: {
        getAttendanceUnits() {
            axios.get( '/unit-presensi' )
                .then( response => this.attendanceUnits = response.data.data )
                .catch( error => console.log( error ) );
        },

        store() {
            useLoadingStore().loading = true;

            axios.post( '/unit-presensi', this.attendanceUnit )
                .then( response => {
                    this.attendanceUnit = {
                        name: "",
                        identifier: ""
                    };
                    this.getAttendanceUnits();
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        setClass( attendanceUnitId ) {
            axios.put( `/unit-presensi/${this.attendanceUnitId}/kelas` );
        },

        assign( attendanceUnitId, classId ) {
            useLoadingStore().loading = true;

            axios.put( `/unit-presensi/${attendanceUnitId}/kelas`, { classId: classId } )
                .then( response => {
                    this.getAttendanceUnits();
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        destroy( attendanceUnitId ) {
            useLoadingStore().loading = true;

            axios.delete( `/unit-presensi/${attendanceUnitId}` )
                .then( response => {
                    this.getAttendanceUnits();
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        }
    }
} );