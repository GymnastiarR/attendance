// import { defineStore } from "pinia";

// export const useErrorStore = defineStore( 'error', {
//     state: () => ( {
//         success: {
//             status: "",
//             messsages: ""
//         }
//     } ),

//     getters: {
//         getTest() {

//         }
//     },

//     actions: {

//         get( key ) {
//             const error = this.errors.find( error => error.context.key === key );
//             return error ? error.message : undefined;
//         },

//         clear() {
//             this.error = {
//                 status: "",
//                 messsages: ""
//             };
//         },

//     }
// } );