import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import { useSuccessStore } from "./success";
import { useWarningStore } from "./warning";

export const useAttendanceStore = defineStore( 'attendance', {
    state: () => ( {
        attendances: [],

        attendance: {
            status: "",
            date: ""
        },

        selectedStudent: null,

        date: "",

        automationStatus: false
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
                    this.getAttendances();
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

        destroy( attendanceId ) {
            return () => {
                useWarningStore().warning = null;
                useLoadingStore().loading = true;

                axios.delete( `/presensi/${attendanceId}` )
                    .then( response => {
                        this.getAttendances();
                        useSuccessStore().setSuccess( response );

                    } )
                    .catch( error => {
                        console.log( error );
                        useErrorStore().setError( error );
                    } )
                    .finally( () => {
                        useLoadingStore().loading = false;
                    } );
            };
        },

        getAttendances() {
            axios.get( '/presensi' )
                .then( response => {
                    this.attendances = response.data.data;
                } )
                .catch( error => console.log( error ) );
        },

        getAttendanceAutomationStatus() {
            axios.get( '/presensi/automation' )
                .then( response => {
                    console.log( response.data.status );
                    this.automationStatus = response.data.status;
                } )
                .catch( error => console.log( error ) );
        },

        runAutomation() {
            useLoadingStore().loading = true;

            axios.get( '/presensi/automation/start' )
                .then( response => {
                    this.getAttendanceAutomationStatus();
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        stopAutomation() {
            useLoadingStore().loading = true;

            axios.get( '/presensi/automation/stop' )
                .then( response => {
                    this.getAttendanceAutomationStatus();
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