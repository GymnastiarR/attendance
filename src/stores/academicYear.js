import { defineStore } from "pinia";
import { useClassStore } from "./class";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import axios from "../axiosConfiguration.js";

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
            axios.get( '/tahun-pelajaran' )
                .then( response => this.academicYears = response.data.data )
                .catch( error => {
                    useErrorStore().setError( error );
                } );
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
            useLoadingStore().loading = true;
            axios.post( '/tahun-pelajaran', this.academicYear )
                .then( response => {
                    this.academicYear = {
                        year: "",
                        semester: "",
                        duplicate: false,
                    };
                    this.getAcademicYears();
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