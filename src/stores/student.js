import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useClassStore } from "./class";
import { useLoadingStore } from "./loading";
import { useSuccessStore } from "./success";

export const useStudentStore = defineStore( 'student', {
    state: () => ( {
        students: [],
        student: {
            name: "",
            nis: "",
            classId: ""
        },
        detailStudent: {

        }
    } ),

    actions: {
        storeStudent() {
            useLoadingStore().loading = true;
            axios.post( '/siswa', this.student )
                .then( response => {
                    this.getUser();
                    this.student = {
                        name: "",
                        nis: "",
                        classId: ""
                    };
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        getUser( query = '' ) {
            useLoadingStore().loading = true;

            axios.get( `/siswa${query}` )
                .then( response => {
                    this.students = response.data.data;
                } )
                .catch( error => {
                    console.log( error );
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        assignStudent( classId, studentId ) {
            useLoadingStore().loading = true;

            axios.put( `/siswa/${studentId}/kelas`, { classId: classId } )
                .then( response => {
                    this.getUser( '?tanpa_kelas=true' );
                    useClassStore().getClass( classId );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        getStudent( studentId ) {
            useLoadingStore().loading = true;
            axios.get( `/siswa/${studentId}` )
                .then( response => {
                    console.log( response.data.data );
                    this.detailStudent = response.data.data;
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        destroy( studentId ) {
            useLoadingStore().loading = true;

            axios.delete( `/siswa/${studentId}` )
                .then( response => {
                    this.getUser();
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        }
    },
} );