import { defineStore } from "pinia";
import axios from "../axiosConfiguration";
import { useStudentStore } from "./student";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import { useSuccessStore } from "./success";

export const useClassStore = defineStore( 'class', {

    state: () => ( {
        classes: [],
        clss: {
            name: "",
            yearId: "",
            majorId: "",
            classRoomId: "",
            studentsId: [],
            attendanceUnitId: ""
        },
        classDetail: {

        }
    } ),

    getters: {
        getClassesName() {
            if ( this.classes.length === 0 ) return [];
            return this.classes.map( clss => {
                return { id: clss.id, name: `${clss.Year.name} ${clss.Major.name} ${clss.name}` };
            } );
        }
    },

    actions: {
        getClasses( query = '' ) {
            axios.get( `/kelas${query}` )
                .then( response => {
                    this.classes = response.data.data;
                } )
                .catch( err => {
                    useErrorStore().setError( err );
                } );
        },

        getClass( classId, query = '' ) {
            axios.get( `/kelas/${classId}` )
                .then( response => {
                    this.classDetail = response.data.data;
                } )
                .catch( err => console.log( err ) );
        },

        className( clas ) {
            return `${clas.Year.name} ${clas.Major.name} ${clas.name}`;
        },

        store() {
            useLoadingStore().loading = true;
            axios.post( '/kelas', this.clss )
                .then( response => {
                    this.clss = {
                        name: "",
                        yearId: "",
                        majorId: "",
                        classRoomId: "",
                        studentsId: [],
                        attendanceUnitId: ""
                    };
                    this.getClasses();
                    useStudentStore().getUser( '?tanpa_kelas=true' );
                    useSuccessStore().setSuccess( response );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        getAttendances( classId ) {
            axios.get( `/kelas/${classId}/presence` )
                .then( response => {
                    console.log( response.data.data );
                } )
                .catch( error => console.log( error ) );
        },

        removeStudent( classId, studentId ) {
            axios.put( `/kelas/${classId}`, { studentId: studentId } )
                .then( response => {
                    useStudentStore().getUser( '?tanpa_kelas=true' );
                    this.getClass( classId );
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } );
        },

        solveClassName( clss ) {
            return `${clss.Year.name} ${clss.Major.name} ${clss.name}`;
        }
    }
} );