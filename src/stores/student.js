import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useClassStore } from "./class";
import { useLoadingStore } from "./loading";

export const useStudentStore = defineStore( 'student', {
    state: () => ( {
        students: null,
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
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        getUser( query = '' ) {
            axios.get( `/siswa${query}` )
                .then( response => {
                    this.students = response.data.data;
                } )
                .catch( error => {
                    useErrorStore().errors = error.response.data.message;
                } );
        },

        assignStudent( classId, studentId ) {
            axios.put( `/siswa/${studentId}/kelas`, { classId: classId } )
                .then( response => {
                    this.getUser( '?tanpa_kelas=true' );
                    useClassStore().getClass( classId );
                } )
                .catch( error => {
                    console.log( error );
                } );
        },

        getStudent( studentId ) {
            axios.get( `/siswa/${studentId}` )
                .then( response => {
                    this.detailStudent = response.data.data;
                } )
                .catch( error => {
                    console.log( error );
                } );
        },
    },
} );