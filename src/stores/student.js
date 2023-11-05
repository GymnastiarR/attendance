import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useClassStore } from "./class";
import { useLoadingStore } from "./loading";
import { useSuccessStore } from "./success";
import { useWarningStore } from "./warning";
import { Call } from "../services/Calling";

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
            Call.post( '/siswa', this.student, ( error, response ) => {
                if ( error ) {
                    return;
                }
                useSuccessStore().setSuccess( response, () => {
                    this.getUser();
                    this.clear();
                } );
            } );
        },

        clear() {
            this.student = {
                name: "",
                nis: "",
                classId: ""
            };
        },

        getUser( query = '' ) {
            Call.get( `/siswa${query}`, ( error, response ) => {
                if ( error ) {
                    return;
                }
                this.students = response.data.data;
            } );
        },

        assignStudent( classId, studentId ) {
            Call.put( `/siswa/${studentId}/kelas`, { classId: classId }, ( error, response ) => {
                if ( error ) {
                    return;
                }
                useClassStore().getClass( classId );
                this.getUser( '?tanpa_kelas=true' );
            } );
        },

        getStudent( studentId ) {
            Call.get( `/siswa/${studentId}`, ( error, response ) => {
                if ( error ) {
                    return;
                }
                this.detailStudent = response.data.data;
            } );
        },

        destroy( studentId ) {
            return () => {
                Call.delete( `/siswa/${studentId}`, ( error, response ) => {
                    if ( error ) {
                        return;
                    }
                    useSuccessStore().setSuccess( response );

                    this.getUser();
                } );
            };
        },

        duplicate( classesId ) {
            useLoadingStore().loading = true;
            axios.post( `/siswa/duplicate`, { classesId } )
                .then( response => {
                    useSuccessStore().setSuccess( response );
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