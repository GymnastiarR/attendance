
<script setup>
import { IconStudent, IconDashboard, IconDoor, IconReport, IconCallender, IconRaiseHand, IconGroup, IconMore, IconClose, IconSchool } from './icons';
import { useMenuStore } from '../stores/menu';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';

const menuStore = useMenuStore();
const classStore = useClassStore();

const { isShow } = storeToRefs( menuStore );
const { classes } = storeToRefs( classStore );

onBeforeMount( () => {
    classStore.getClasses();
} );

const showClasses = ref( false );

</script>
<template>
    <!-- <Transition name="fade"> -->
    <aside :class="[isShow ? '' : 'hidden']"
        class="w-full z-10 fixed top-0 bottom-0 xl:block xl:w-1/5 bg-white h-full py-4 px-12 xl:sticky">
        <div class="mt-4 flex justify-between xl:hidden">
            <h1 class="text-lg font-semibold text-black block">SMAN 103 Jakarta</h1>
            <button @click="() => {
                isShow = false
                console.log(isShow)
            }">
                <IconClose />
            </button>
        </div>
        <ul>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconDashboard />
                </span>
                <router-link @click="isShow = false" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconStudent />
                </span>
                <router-link @click="isShow = false" to="/siswa">Data Siswa</router-link>
            </li>
            <li class="my-4">
                <div class="flex items-center justify-between" @click="showClasses = !showClasses">
                    <div class="flex items-center ">
                        <span class="mr-3">
                            <IconGroup />
                        </span>
                        <router-link @click="isShow = false" to="/kelas">Data Kelas</router-link>
                    </div>
                    <button>
                        <IconMore />
                    </button>
                </div>
                <ul class="ml-11" v-show="showClasses">
                    <li class="my-2" v-for="clas in classStore.classes">
                        <router-link @click="isShow = false" :to="`/kelas/${clas.id}`">
                            {{ classStore.solveClassName(clas) }}
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconDoor />
                </span>
                <router-link @click="isShow = false" to="/dashboard">Data Ruangan</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconRaiseHand />
                </span>
                <router-link @click="isShow = false" to="/presensi">Data Presensi</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconSchool />
                </span>
                <router-link @click="isShow = false" to="/informasi-sekolah">Informasi Sekolah</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconReport />
                </span>
                <router-link @click="isShow = false" to="/dashboard">Data Laporan</router-link>
            </li>
            <li class="my-4 flex items-center bg-blue-400 p-2 rounded-md -mx-2">
                <span class="mr-3">
                    <IconCallender />
                </span>
                <router-link @click="isShow = false" to="/tahun-ajaran" class="font-semibold">Tahun Ajaran</router-link>
            </li>
        </ul>
        <p class="font-semibold">Peralatan</p>
        <ul>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconCallender />
                </span>
                <router-link to="/unit-presensi" class="font-semibold">Unit Presensi</router-link>
            </li>
        </ul>
    </aside>
    <!-- </Transition> -->
</template>

<style scoped>
.fade-enter-active {
    transform: translateX(0px);
    transition: all 1s;
}

.fade-leave-active {
    transition: all 1s;
    transform: translateX(-200px);
}

.fade-enter-from {
    transform: translateX(-200px);
}
</style>