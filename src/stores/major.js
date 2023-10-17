import axios from "../axiosConfiguration";
import { defineStore } from "pinia";

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
            axios.post( '/jurusan', this.major )
                .then( () => {
                    this.major = {
                        name: "",
                    };
                } )
                .catch( error => console.log( error ) );
        }
    }
} );