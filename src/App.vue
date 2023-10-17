<script setup>
import { RouterLink, RouterView } from 'vue-router';
import IconMenu from './components/icons/IconMenu.vue';
import { store } from './store.js';
import ErrorAlert from './components/ErrorAlert.vue';
import { useAcademicYearStore } from './stores/academicYear';
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useMenuStore } from './stores/menu';
import { useErrorStore } from './stores/error';

const academicYearStore = useAcademicYearStore();
const menuStore = useMenuStore();
const errorStore = useErrorStore();

onBeforeMount( () => {
  academicYearStore.getCurrentAcademicYear();
} );

const { currentAcademicYear } = storeToRefs( academicYearStore );
const { error } = storeToRefs( errorStore );
const { isShow } = storeToRefs( menuStore );

// export default {
//   components: {
//     IconMenu,
//     RouterLink,
//     RouterView,
//     ErrorAlert
//   },
//   data() {
//     return {
//       store
//     };
//   },
//   beforeMount() {
//     axios.get( '/tahun-pelajaran?active=true' )
//       .then( response => {
//         this.store.academicYear = response.data.data[ 0 ];
//       } )
//       .catch( error => {
//         console.log( error );
//       } );
//   }
// };
</script>

<template>
  <header class="bg-[#5046E5] flex justify-between px-4 lg:px-12 items-center">
    <h1 class="text-lg font-semibold text-white hidden xl:block">SMAN 103 Jakarta</h1>
    <button class="xl:hidden" @click="isShow = true">
      <IconMenu />
    </button>
    <nav class="h-20 flex items-center">
      <!-- <RouterLink to="/" class="px-4 text-white">Home</RouterLink>
      <RouterLink to="/about" class="px-4 text-white">About</RouterLink> -->
      <p class="text-white">Tahun Ajaran {{ currentAcademicYear.year }} Semester {{ currentAcademicYear.semester }}</p>
    </nav>
  </header>
  <ErrorAlert v-if="error" />
  <RouterView />
</template>