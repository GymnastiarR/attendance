<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import CreateView from '../components/pages/attendance_unit/CreateView.vue';
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAttendanceUnitStore } from '../stores/attendanceUnit';
import { useClassStore } from '../stores/class';

const attendanceUnitStore = useAttendanceUnitStore();
const classStore = useClassStore();

const { attendanceUnits } = storeToRefs( attendanceUnitStore );
const { classes } = storeToRefs( classStore );

onBeforeMount( () => {
    attendanceUnitStore.getAttendanceUnits();
    classStore.getClasses();
} );

const isShow = ref( false );
</script>
<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <CreateView />
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <div class="border-b-2 pb-4 mb-3">
                    <h1 class="text-sm font-semibold">Unit Presensi</h1>
                </div>
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Nama</th>
                            <th class="text-left px-3 text-sm">Kelas</th>
                            <th class="text-left px-3 text-sm">Id Unik</th>
                            <!-- <th class="text-left px-3 text-sm">RFID</th> -->
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(unit, index) of attendanceUnits">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ unit.name }}</td>
                            <td class="px-3 h-12 text-sm">
                                {{ unit.Class.length > 0 ? namaKelas(unit.Class) : 'Belum Ada' }}</td>
                            <td class="px-3 h-12 text-sm">{{ unit.identifier }}</td>
                            <!-- <td class="px-3 h-12 text-sm" v-text="siswa.uidRFID ? siswa.uidRFID : 'BELUM PUNYA'"></td> -->
                            <td class="text-center">
                                <button @click="() => { isShow = true; attendanceUnitId = unit.id }"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1">
                                    Pilih Kelas
                                </button>
                                <RouterLink to="/siswa/" class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1">
                                    Hapus
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div :class="{ 'hidden': !isShow }"
                class="flex justify-center items-center z-20 fixed top-0 right-0 bottom-0 left-0 bg-black/50"
                @click="isShow = false">
                <div @click="(event) => { event.stopPropagation() }"
                    class="px-6 py-6 bg-white rounded-md h-96 overflow-auto relative z-10">
                    <table class="w-[100%] min-w-[500px] rounded-md overflow-hidden">
                        <thead>
                            <tr class="h-10 bg-blue-400 text-white">
                                <th class="text-left px-3 text-sm">No</th>
                                <th class="text-left px-3 text-sm">Nama Kelas</th>
                                <th class="text-left px-3 text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(clas, index) of classes" class="odd:bg-slate-100">
                                <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                                <td class="px-3 h-12 text-sm">{{ clas.Year.name }} {{ clas.Major.name }} {{
                                    clas.name }}</td>
                                <td>
                                    <button @click="assignUnitPresensi(clas.id)"
                                        class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1">
                                        Pilih
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    </div>
</template>