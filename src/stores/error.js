import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useErrorStore = defineStore( 'error', {
    state: () => ( {
        error: {
            status: "",
            messages: ""
        }
    } ),

    actions: {
        setError( error ) {
            if ( error.response.status == 400 ) {
                this.error = {
                    status: error.response.status,
                    messages: JSON.parse( error.response.data.message )
                };
                return;
            }

            if ( error.response.status === 409 ) {
                this.error = {
                    status: error.response.status,
                    messages: error.response.data.message
                };
                return;
            }

            if ( error.response.status === 401 ) {
                this.$router.push( { name: 'login' } );
                return;
            }

            this.error = {
                status: error.response.status,
                messages: error.response.data.message
            };
        },

        clear() {
            this.error = {
                status: "",
                messsages: ""
            };
        },

    }
} );