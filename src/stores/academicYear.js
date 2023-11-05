import { defineStore } from "pinia";
import { useClassStore } from "./class";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";
import axios from "../axiosConfiguration.js";
import { Call } from "../services/call.js";

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
        clear() {
            this.academicYear = {
                year: "",
                semester: "",
                duplicate: false,
            };
        },
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
            Call.get( `/tahun-pelajaran/${academicYearId}/active`, ( error, response ) => {
                if ( error ) {
                    return;
                }
                this.getCurrentAcademicYear();
                this.getAcademicYears();
                useClassStore().getClasses();
            } );
        },

        store() {
            Call.post( '/tahun-pelajaran', this.academicYear, ( error, response ) => {
                if ( error ) {
                    return;
                }
                this.clear();
                this.getAcademicYears();
            } );
        }
    }
} );