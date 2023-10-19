<script setup>
import { storeToRefs } from 'pinia';
import IconClose from '../../../components/icons/IconClose.vue';
import { useStudentStore } from '../../../stores/student';
import { useAttendanceStore } from '../../../stores/attendance';
import { ref, onBeforeMount } from 'vue';

const studentStore = useStudentStore();
const attendanceStore = useAttendanceStore();

const { students } = storeToRefs( studentStore );
const { attendance, selectedStudent } = storeToRefs( attendanceStore );

const search = ref( "" );

onBeforeMount( () => {
    studentStore.getUser( '' );
} );

</script>

<template>
    <div class="bg-white drop-shadow-md rounded-md px-8 py-6 mb-3">
        <div class="mb-2 border-b-2 pb-2">
            <h1 class="font-semibold">Presensi</h1>
        </div>
        <div class="flex flex-col lg:flex-row">
            <div class="w-full lg:w-1/2 pr-4">
                <div class="flex flex-col mb-2">
                    <label for="" class="text-sm mb-1">Tanggal</label>
                    <input type="date" class="py-1 px-2 rounded-md border-2" v-model="attendance.date">
                </div>
                <div class="flex flex-col mb-2">
                    <label for="" class="text-sm mb-1">Siswa</label>
                    <div v-if="selectedStudent" class="flex items-center justify-between">
                        <p>{{ selectedStudent.name }} {{ selectedStudent.nis }}</p>
                        <button @click="selectedStudent = ''">
                            <IconClose size="20" />
                        </button>
                    </div>
                    <div class="flex" v-else>
                        {{ search }}
                        <input v-model="search" type="text" class="py-1 px-2 rounded-md border-2 mr-2">
                        <button @click="studentStore.getUser(`?tanpa_kelas=true&search=${search}`)"
                            class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white">Cari</button>
                    </div>
                </div>
                <div class="flex flex-col mb-2">
                    <label for="" class="text-sm mb-1">Status</label>
                    <select name="" id="" class="py-1 px-2 rounded-md border-2" v-model="attendance.status">
                        <option value="" disabled>Pilih Status Kehadiran</option>
                        <option value="Hadir">Hadir</option>
                        <option value="Alfa">Alfa</option>
                        <option value="Sakit">Sakit</option>
                        <option value="Izin">Izin</option>
                    </select>
                </div>
            </div>
            <div class="w-full lg:w-1/2 overflow-auto min-h-[100px]">
                <table class="min-w-[700px]">
                    <thead>
                        <tr>
                            <th class="text-left px-3 text-sm">Nama</th>
                            <th class="text-left px-3 text-sm">NIS</th>
                            <th class="text-left px-3 text-sm">Kelas</th>
                            <th class="px-3 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in students">
                            <td class="px-3 py-2 text-sm w-60">{{ student.name }}</td>
                            <td class="px-3 py-2 text-sm">{{ student.nis }}</td>
                            <td class="px-3 py-2 text-sm">
                                {{ student.Class ? 'Ada' : 'Gak ada' }}
                            </td>
                            <td class="px-3 py-2 text-sm flex justify-center">
                                <button @click="selectedStudent = student"
                                    class="bg-blue-500 text-white rounded-md px-4 text-sm py-2">
                                    Pilih
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button @click="attendanceStore.updateStatusAttendanceStudent()"
            class="px-3 py-2 text-xs bg-blue-500 rounded-md text-white">Tetapkan
            Kehadiran</button>
    </div>
</template>