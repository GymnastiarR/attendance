import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import { useSuccessStore } from "./success";

export const useAttendanceStore = defineStore( 'attendance', {
    state: () => ( {
        attendances: [],

        attendance: {
            status: "",
            date: ""
        },

        selectedStudent: null,

        date: ""
    } ),
    actions: {
        updateStatusAttendanceStudent() {
            useLoadingStore().loading = true;

            axios.put( `/presensi/${this.selectedStudent.id}`, { date: this.attendance.date, status: this.attendance.status } )
                .then( response => {
                    // this.getAttendances();
                    this.attendance = {
                        status: "",
                        date: ""
                    };
                    this.selectedStudent = null;
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    console.log( error );
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        store() {
            useLoadingStore().loading = true;

            axios.post( '/presensi', { date: this.date } )
                .then( response => {
                    this.getAttendances();
                    this.date = "";
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
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