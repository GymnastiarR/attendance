import axios from "../axiosConfiguration";
import { defineStore } from "pinia";
import { useErrorStore } from "./error";

export const useYearStore = defineStore( 'year', {
    state: () => ( {
        years: "",
        year: {
            name: ""
        }
    } ),
    actions: {
        getYears() {
            axios.get( '/tingkat' )
                .then( response => this.years = response.data.data )
                .catch( error => console.log( error ) );
        },

        store() {
            axios.post( '/tingkat', this.year )
                .then( () => {
                    this.year = {
                        name: ""
                    };
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } );
        }
    }
} );