<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useMajorStore } from '../stores/major';
import { useYearStore } from '../stores/year';
import { storeToRefs } from 'pinia';

const majorStore = useMajorStore();
const yearStore = useYearStore();

const { major } = storeToRefs( majorStore );
const { year } = storeToRefs( yearStore );
</script>
<template>
    <div class="flex">
        <SideMenu />
        <!-- <main class="bg-[#f5f5f5] w-4/5 p-8"> -->
        <AppLayout>
            <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-4">
                <h2 class="text-lg font-semibold mb-4">Informasi Sekolah</h2>
                <table>
                    <tbody>
                        <tr class="mb-2">
                            <td>Nama Sekolah</td>
                            <td class="w-3 text-center">:</td>
                            <td>SMAN 103 Jakarta</td>
                        </tr>
                        <tr class="mb-2">
                            <td>Alamat</td>
                            <td class="w-3 text-center">:</td>
                            <td>Jalan Pengarengan Kp Rawabadung Rt 01</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h2 class="">Jurusan</h2>
                    <ul class="ml-6 list-disc">
                        <li>
                            <p>IPA</p>
                        </li>
                        <li>
                            <p>IPS</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-4">
                <div class="border-b-2 pb-3 mb-3">
                    <h2 class="font-semibold">Buat Jurusan Baru</h2>
                </div>
                <form action="" class="w-1/2">
                    <div class="flex flex-col mb-4">
                        <label for="">Nama Jurusan</label>
                        <input placeholder="IPA" type="text" v-model="major.name" class="border-2 rounded-md px-2 py-1">
                    </div>
                    <button @click.prevent="majorStore.store" class="text-white py-2 bg-blue-500 px-4 rounded-md text-xs">
                        Buat Jurusan
                    </button>
                </form>
            </div>
            <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-4">
                <div class="border-b-2 pb-3 mb-3">
                    <h2 class="font-semibold">Buat Tingkat</h2>
                </div>
                <form action="" class="w-1/2">
                    <div class="flex flex-col mb-4">
                        <label for="">Nama Tingkat</label>
                        <input placeholder="10" type="text" v-model="year.name" class="border-2 rounded-md px-2 py-1">
                    </div>
                    <button @click.prevent="yearStore.store" class="text-white py-2 bg-blue-500 px-4 rounded-md text-xs">
                        Buat Tingkat
                    </button>
                </form>
            </div>
        </AppLayout>
        <!-- </main> -->
    </div>
</template>