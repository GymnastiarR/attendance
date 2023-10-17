
<script setup>
import { IconStudent, IconDashboard, IconDoor, IconReport, IconCallender, IconRaiseHand, IconGroup, IconMore, IconClose, IconSchool } from './icons';
import { useMenuStore } from '../stores/menu';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';

const menuStore = useMenuStore();
const classStore = useClassStore();

const { isShow } = storeToRefs( menuStore );

onBeforeMount( () => {
    classStore.getClasses();
} );

const showClasses = ref( false );

</script>
<template>
    <aside :class="{ 'hidden': !isShow }"
        class="w-full z-10 fixed top-0 bottom-0 xl:block xl:w-1/5 bg-white h-full py-4 px-12 xl:sticky">
        <div class="mt-4 flex justify-between xl:hidden">
            <h1 class="text-lg font-semibold text-black block">SMAN 103 Jakarta</h1>
            <button @click="isShow = false">
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
                    <li class="my-2" v-for="clas in classStore.getClassesName">
                        <router-link @click="isShow = false" :to="`/kelas/${clas.id}`">
                            {{ clas.name }}
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconDoor />
                </span>
                <router-link to="/dashboard">Data Ruangan</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconRaiseHand />
                </span>
                <router-link to="/presensi">Data Presensi</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconSchool />
                </span>
                <router-link to="/informasi-sekolah">Informasi Sekolah</router-link>
            </li>
            <li class="my-4 flex items-center">
                <span class="mr-3">
                    <IconReport />
                </span>
                <router-link to="/dashboard">Data Laporan</router-link>
            </li>
            <li class="my-4 flex items-center bg-blue-400 p-2 rounded-md -mx-2">
                <span class="mr-3">
                    <IconCallender />
                </span>
                <router-link to="/tahun-ajaran" class="font-semibold">Tahun Ajaran</router-link>
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
</template>