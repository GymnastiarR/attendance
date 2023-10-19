<script setup>
import SideMenu from "../components/SideMenu.vue";
import IconLink from "../components/icons/IconLink.vue";
import socket from "../socket";
import AppLayout from "../layouts/AppLayout.vue";
import { onBeforeMount, ref } from "vue";
import { useStudentStore } from "../stores/student";
import { useRfidStore } from "../stores/rfid";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const $route = ref( useRoute() );

const studentStore = useStudentStore();
const rfidStore = useRfidStore();

const { detailStudent } = storeToRefs( studentStore );

let rfid = ref( "" );

socket.on( 'RFID', ( data ) => {
    rfid.value = data;
} );

onBeforeMount( () => {
    studentStore.getStudent( $route.value.params.id );
} );



// export default {
//     components: {
//         SideMenu, IconLink,
//         AppLayout
//     },
//     data() {
//         return {
//             rfid: "",
//             student: {},
//             store
//         };
//     },

//     beforeMount() {
//         socket.on( 'RFID', ( data ) => {
//             this.rfid = data;
//         } );
//     },

//     computed: {
//         isDisabled() {
//             return this.rfid === "";
//         }
//     },

//     methods: {
//         submit: function () {
//             axios.post( `/siswa/${this.$route.params.id}/rfid`, { rfid: this.rfid } )
//                 .then( ( response ) => {
//                     this.$router.push( '/siswa' );
//                 } )
//                 .catch( function ( error ) {
//                     store.error = error.response.data;
//                 } );
//         }
//     }
// };
</script>
<template>
    <div class="min-h-screen flex">
        <SideMenu />
        <AppLayout>
            <section class="flex flex-col items-center">
                <div class="bg-white w-full lg:w-1/2 rounded-md drop-shadow-md p-8 py-6">
                    <div class="border-b-2 mb-4">
                        <h2 class="font-semibold mb-4">Menghubungkan Kartu</h2>
                    </div>
                    <div class="flex flex-col items-center">
                        <div class="flex flex-col items-center mb-3">
                            <p>{{ detailStudent.name }}</p>
                            <p>{{ detailStudent.nis }}</p>
                        </div>
                        <IconLink />
                        <div class="mb-3">
                            <p v-if="rfid === ''" class="text-lg font-semibold">Silahkan Tap Kartu</p>
                            <p v-else class="text-lg font-semibold">{{ rfid }}</p>
                        </div>
                        <button @click="rfidStore.store(detailStudent.id, rfid)"
                            class="px-3 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-30"
                            :disabled="!rfid">Hubungkan</button>
                    </div>
                </div>
            </section>
        </AppLayout>
    </div>
</template>