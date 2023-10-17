import { defineStore } from "pinia";
import { useClassStore } from "./class";
import axios from "axios";

export const useAcademicYearStore = defineStore( 'academicYear', {
    state: () => ( {
        currentAcademicYear: {},
        academicYears: [],
        academicYear: {
            year: "",
            semester: "",
            duplicate: false,
        },
    } ),

    actions: {
        getCurrentAcademicYear() {
            axios.get( '/tahun-pelajaran?active=true' )
                .then( response => {
                    this.currentAcademicYear = response.data.data[ 0 ];
                } )
                .catch( error => {
                    console.log( error );
                } );
        },

        getAcademicYears() {
            axios.get( 'https://api.brickboxrnd.my.id/api' )
                .then( response => this.academicYears = response.data.data )
                .catch( error => console.log( error ) );
        },

        setCurrentAcademicYear( academicYearId ) {
            axios.get( `/tahun-pelajaran/${academicYearId}/active` )
                .then( response => {
                    this.getCurrentAcademicYear();
                    this.getAcademicYears();
                    useClassStore().getClasses();
                } )
                .catch( error => console.log( error ) );
        },

        store() {
            axios.post( 'https://api.brickboxrnd.my.id/api/tahun-pelajaran', this.academicYear )
                .then( response => {
                    this.academicYear = {
                        year: "",
                        semester: "",
                        duplicate: false,
                    };
                    this.getAcademicYears();
                } )
                .catch( error => console.log( error ) );
        }
    }
} );