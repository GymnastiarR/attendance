<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useAcademicYearStore } from '../stores/academicYear';
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';

const academicYearStore = useAcademicYearStore();

const { academicYears, academicYear } = storeToRefs( academicYearStore );

onBeforeMount( () => {
    academicYearStore.getAcademicYears();
} );
</script>

<template>
    <div class="flex">
        <SideMenu />
        <!-- <main class="bg-[#F5F5F5] w-full xl:w-4/5 p-8"> -->
        <AppLayout>
            <div class="bg-white drop-shadow-md rounded-md px-8 py-6 mb-3">
                <div class="mb-2 border-b-2 pb-2">
                    <h1 class="font-semibold">Tahun Ajaran Baru</h1>
                </div>
                <form action="" class="w-full md:w-1/2 lg:w-1/3">
                    <div class="flex flex-col mb-3">
                        <label for="tahun-ajaran">Tahun Ajaran</label>
                        <span class="text-red-500 text-xs my-1">{{ error }}</span>
                        <input id="tahun-ajaran" class="py-1 px-2 rounded-md border-2" v-model="academicYear.year"
                            type="text" placeholder="2021/2022">
                    </div>
                    <div class="flex flex-col mb-3">
                        <label class="mb-1" for="">Semester</label>
                        <select class="py-1 px-2 rounded-md border-2" v-model="academicYear.semester">
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>
                    <div class="mb-2 flex justify-between items-center">
                        <label class="inline-block w-2/3 text-xs" for="">Duplilkat sturktur kelas dari tahun
                            sebelumnya</label>
                        <input class="w-4 h-4" type="checkbox" v-model="academicYear.duplicate">
                    </div>
                    <div>
                        <button @click.prevent="academicYearStore.store"
                            class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white">Buat
                            Tahun Ajaran</button>
                    </div>
                </form>
            </div>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Nama</th>
                            <th class="text-left px-3 text-sm">Semester</th>
                            <th class="text-left px-3 text-sm">Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(academicYear, index) of academicYears">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ academicYear.year }}</td>
                            <td class="px-3 h-12 text-sm">{{ academicYear.semester }}</td>
                            <td class="px-3 h-12 text-sm">{{ academicYear.isActive ? 'Aktif' : 'Tidak Aktif' }}</td>
                            <td class="text-center">
                                <button @click="academicYearStore.setCurrentAcademicYear(academicYear.id)"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1"
                                    :disabled="academicYear.isActive">
                                    Aktifkan
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
        <!-- </main> -->
    </div>
</template>