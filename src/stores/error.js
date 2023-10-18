import { defineStore } from "pinia";

export const useErrorStore = defineStore( 'error', {
    state: () => ( {
        error: {
            status: "",
            messages: ""
        }
    } ),

    getters: {
        getTest() {

        }
    },

    actions: {
        setError( error ) {
            if ( error.code == "ERR_BAD_REQUEST" ) {
                this.error = {
                    status: error.code,
                    messages: JSON.parse( error.response.data.message )
                };
                return;
            }
            this.error = {
                messages: error.response.data.message
            };
        },

        get( key ) {
            const error = this.errors.find( error => error.context.key === key );
            return error ? error.message : undefined;
        },

        clear() {
            this.error = {
                status: "",
                messsages: ""
            };
        },

    }
} );