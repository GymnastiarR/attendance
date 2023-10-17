// store.js
import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive( {
    isShow: false,
    academicYear: {},
    classes: [],
    error: null,
    refreshKelas: function () {
        axios.get( '/kelas' )
            .then( ( response ) => {
                this.classes = response.data.data;
            } )
            .catch( ( error ) => {
                console.log( error );
            } );
    },
} );