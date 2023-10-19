<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { useClassStore } from '../stores/class';
import { useStudentStore } from '../stores/student';
import { useYearStore } from '../stores/year';
import { useMajorStore } from '../stores/major';
import { useAttendanceUnitStore } from '../stores/attendanceUnit';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';

const classStore = useClassStore();
const studentStore = useStudentStore();
const yearStore = useYearStore();
const majorStore = useMajorStore();
const attendanceUnitStore = useAttendanceUnitStore();

const { clss, classes } = storeToRefs( classStore );
const { years } = storeToRefs( yearStore );
const { majors } = storeToRefs( majorStore );
const { attendanceUnits } = storeToRefs( attendanceUnitStore );
const { students } = storeToRefs( studentStore );

onBeforeMount( () => {
    studentStore.getUser( '?tanpa_kelas=true' );
    yearStore.getYears();
    classStore.getClasses();
    majorStore.getMajors();
    attendanceUnitStore.getAttendanceUnits();
} );
</script>

<template>
    <div class="flex">
        <SideMenu />
        <!-- <main class="bg-[#f5f5f5] w-4/5 p-8"> -->
        <AppLayout>
            <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-3">
                <div class="border-b-2 pb-3 mb-3">
                    <h2 class="font-semibold">Buat Kelas Baru</h2>
                </div>
                <div class="flex flex-wrap">
                    <div class="w-full lg:w-1/2 pr-4">
                        <div class="flex flex-col mb-3">
                            <label for="">Indentifier</label>
                            <input v-model="clss.name" type="text" class="border-2 rounded-md px-2 py-1">
                        </div>
                        <div class="flex flex-col mb-3">
                            <label for="">Tingkat</label>
                            <select v-model="clss.yearId" class="border-2 rounded-md px-2 py-1">
                                <option value="" disabled selected>Pilih Tingkat</option>
                                <option v-for="year in years" :value="year.id">{{ year.name }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col mb-3">
                            <!-- {{ majors }} -->
                            <label for="">Jurusan</label>
                            <select v-model="clss.majorId" class="border-2 rounded-md px-2 py-1">
                                <option value="" disabled selected>Pilih Jurusan</option>
                                <option v-for="major in majors" :value="major.id">{{ major.name }}</option>
                            </select>
                        </div>
                        <!-- <div class="flex flex-col mb-3">
                            <label for="">Ruangan</label>
                            <select v-model="clss.idRuangKelas" class="border-2 rounded-md px-2 py-1">
                                <option value="" disabled selected>Pilih Ruangan</option>
                                <option value="0">Biarkan Kosong</option>
                                <option v-for="i in data.ruangKelas" :value="i.id" :disabled="i.Kelas.length > 0">
                                    {{ i.nama }} {{ i.Kelas.length > 0 ? ' (Sudah Terpakai)' : '' }}
                                </option>
                            </select>
                        </div> -->
                        <div class="flex flex-col mb-3">
                            <label for="">Unit Presensi</label>
                            <select v-model="clss.attendanceUnitId" class="border-2 rounded-md px-2 py-1">
                                <option value="" disabled selected>Pilih Unit Presensi</option>
                                <option value="0">Biarkan Kosong</option>
                                <option v-for="attendanceUnit in attendanceUnits" :value="attendanceUnit.id"
                                    :disabled="attendanceUnit.Class.length > 0">
                                    {{ attendanceUnit.name }} {{ attendanceUnit.Class.length > 0 ? ' (Sudah Terpakai)' : ''
                                    }}
                                </option>

                            </select>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2">
                        <h3>Pilih Siswa</h3>
                        <div class="border-2 px-3 py-2 overflow-y-scroll h-[200px]">
                            <table class="w-full">
                                <thead class="h-10">
                                    <tr>
                                        <th class="text-left px-2">No</th>
                                        <th class="text-left px-2">Nama</th>
                                        <th class="text-left px-2">NIS</th>
                                        <th class="text-left px-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(student, index) in students" class="px-3 py-2">
                                        <td class="px-2 py-1">{{ index + 1 }}</td>
                                        <td class="px-2 py-1">{{ student.name }}</td>
                                        <td class="px-2 py-1">{{ student.nis }}</td>
                                        <td class="px-2 py-1">
                                            <input type="checkbox" v-model="clss.studentsId" :value="student.id">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="classStore.store" class="text-white py-2 bg-blue-500 px-4 rounded-md text-xs">Buat
                        Kelas</button>
                </div>
            </div>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Nama</th>
                            <th class="text-left px-3 text-sm">Jumlah Siswa</th>
                            <!-- <th class="text-left px-3 text-sm">Status</th> -->
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(clss, index) of classes">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ clss.Year.name }} {{ clss.Major.name }} {{ clss.name }}</td>
                            <td class="px-3 h-12 text-sm w-32 text-center">{{ clss._count.Student }}</td>
                            <!-- <td class="px-3 h-12 text-sm">{{ academicYear.semester }}</td>
                            <td class="px-3 h-12 text-sm">{{ academicYear.isActive ? 'Aktif' : 'Tidak Aktif' }}</td> -->
                            <td class="text-center">
                                <!-- <button @click="academicYearStore.setCurrentAcademicYear(academicYear.id)"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1"
                                    :disabled="academicYear.isActive">
                                    Aktifkan
                                </button> -->
                                <RouterLink class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1"
                                    :to="'/kelas/' + clss.id">Lihat Kelas</RouterLink>
                                <button @click="classStore.getAttendances(clss.id)"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1">Presensi</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
        <!-- </main> -->
    </div>
</template>