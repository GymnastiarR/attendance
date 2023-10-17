<script setup>
import SideMenu from '../components/SideMenu.vue';
import SetAttendance from '../components/pages/attendance/SetAttendance.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useAttendanceStore } from '../stores/attendance';
import { ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';

const attendanceStore = useAttendanceStore();

const { attendances } = storeToRefs( attendanceStore );

const date = ref( "" );

onBeforeMount( () => {
    attendanceStore.getAttendances();
} );

</script>
<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <SetAttendance />
            <div class="bg-white drop-shadow-md rounded-md px-8 py-6 mb-3">
                <div class="mb-2 border-b-2 pb-2">
                    <h1 class="font-semibold">Buat Presensi</h1>
                </div>
                <div class="w-full mb-2">
                    <input class="w-full py-1 px-2 rounded-md border-2" type="date" v-model="date">
                </div>
                <button class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white"
                    @click.prevent="attendanceStore.createAttendance(date)">Buat Presensi</button>
            </div>
            <div class="bg-white drop-shadow-md rounded-md px-8 py-6 mb-3">
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Tanggal</th>
                            <th>Hadir</th>
                            <!-- <th class="text-left px-3 text-sm">Jumlah Siswa</th> -->
                            <!-- <th class="text-left px-3 text-sm">Status</th> -->
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(attendance, index) of attendances">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ new Date(attendance.date).toLocaleDateString('id-ID', {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }) }}</td>
                            <td>10</td>
                            <td class="px-3 h-12 text-sm w-32 text-center">
                                <a :href="`http://localhost:80/api/presensi/download?date=${attendance.date}`">Unduh
                                    Data</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
        <!-- </main> -->
    </div>
</template>