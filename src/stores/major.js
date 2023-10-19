import axios from "../axiosConfiguration";
import { defineStore } from "pinia";
import { useErrorStore } from "./error";
import { useLoadingStore } from "./loading";

export const useMajorStore = defineStore( 'major', {
    state: () => ( {
        majors: [],
        major: {
            name: "",
        }
    } ),

    actions: {
        getMajors() {
            axios.get( '/jurusan' )
                .then( response => this.majors = response.data.data )
                .catch( error => console.log( error ) );
        },

        store() {
            useLoadingStore().loading = true;
            axios.post( '/jurusan', this.major )
                .then( () => {
                    this.major = {
                        name: "",
                    };
                } )
                .catch( error => {
                    console.log( error );
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        }
    }
} );