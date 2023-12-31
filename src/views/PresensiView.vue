<script setup>
import SideMenu from '../components/SideMenu.vue';
import SetAttendance from '../components/pages/attendance/SetAttendance.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useAttendanceStore } from '../stores/attendance';
import { ref, onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useWarningStore } from '../stores/warning';

const attendanceStore = useAttendanceStore();

const { attendances, date, automationStatus } = storeToRefs( attendanceStore );

const API = import.meta.env.VITE_API;

onBeforeMount( async () => {
    attendanceStore.getAttendances();
    attendanceStore.getAttendanceAutomationStatus();
} );

const presence = ( attendance, status ) => {
    const result = attendance?.find( ( item ) => item.status === status );
    if ( result ) return result;
    return { status: status, _count: { status: 0 } };
};

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
                <div class="px-4">
                    <div class="mb-4">
                        <h1 class="text-sm mb-2 font-semibold">Buat Presensi Manual</h1>
                        <div class="w-full mb-2">
                            <input class="w-full py-1 px-2 rounded-md border-2" type="date" v-model="date">
                        </div>
                        <button class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white"
                            @click.prevent="attendanceStore.store(date)">Buat Presensi Manual</button>
                    </div>
                    <div>
                        <h1 class="text-sm mb-2 font-semibold">Jalankan Pembuatan Presensi Otomatis</h1>
                        <p class="text-xs mb-2 italic">
                            Dengan menjalankan pembuatan presensi otomatis maka presensi akan dibuat secara otomatis hari
                            senin-jumat jam 00.00
                        </p>

                        <button v-if="automationStatus" class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white"
                            @click="attendanceStore.stopAutomation">Hentikan Automasi</button>

                        <button v-else class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white"
                            @click="attendanceStore.runAutomation">Jalankan Automasi</button>
                    </div>
                </div>
            </div>
            <div class="bg-white drop-shadow-md rounded-md px-8 py-6 mb-3">
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Tanggal</th>
                            <th>Hadir</th>
                            <th>Izin</th>
                            <th>Sakit</th>
                            <th>Alfa</th>
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
                            <td class="text-center w-24">{{ presence(attendance.data, 'Hadir')._count.status }}</td>
                            <td class="text-center w-24">{{ presence(attendance.data, 'Izin')._count.status }}</td>
                            <td class="text-center w-24">{{ presence(attendance.data, 'Sakit')._count.status }}</td>
                            <td class="text-center w-24">{{ presence(attendance.data, 'Alpa')._count.status }}</td>
                            <td class="px-3 h-12 text-sm w-72 text-center">
                                <a class="bg-blue-500 mx-1 text-white px-4 py-2 text-xs rounded-md text-center"
                                    :href="`${API}/presensi/download?dateStart=${attendance.date}`">Unduh
                                    Data</a>
                                <button class="bg-blue-500 mx-1 text-white px-4 py-2 text-xs rounded-md text-center"
                                    @click.prevent="useWarningStore().callWarning('Apakah Anda Yakin Akan Menghapus Presensi?', attendanceStore.destroy(attendance.date))">
                                    Hapus Presensi</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
        <!-- </main> -->
    </div>
</template>