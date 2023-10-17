import { defineStore } from "pinia";
import axios from "axios";
import { useStudentStore } from "./student";

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
            return this.classes.map( clss => {
                return { id: clss.id, name: `${clss.Year.name} ${clss.Major.name} ${clss.name}` };
            } );
        }
    },

    actions: {
        getClasses() {
            axios.get( '/kelas' )
                .then( response => {
                    this.classes = response.data.data;
                } )
                .catch( err => {
                    console.log( err );
                } );
        },

        getClass( classId ) {
            axios.get( `/kelas/${classId}` )
                .then( response => this.classDetail = response.data.data )
                .catch( err => console.log( err ) );
        },

        className( clas ) {
            return `${clas.Year.name} ${clas.Major.name} ${clas.name}`;
        },

        store() {
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
                } )
                .catch( error => {
                    console.log( error );
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
                    console.log( error );
                } );
        }
    }
} );