import { defineStore } from "pinia";

export const useErrorStore = defineStore( 'error', {
    state: () => ( {
        errors: []
    } ),

    getters: {
        getTest() {

        }
    },

    actions: {
        setError( errors ) {
            this.errors = errors.map( error => {
                console.log( error.context.label );
                return { 'name': 'name' };
            } );
        },

        get( key ) {
            const error = this.errors.find( error => error.context.key === key );
            return error ? error.message : undefined;
        }
    }
} );