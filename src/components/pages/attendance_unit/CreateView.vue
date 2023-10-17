<script setup>
import { useAttendanceUnitStore } from '../../../stores/attendanceUnit';
import { storeToRefs } from 'pinia';

const attendanceUnitStore = useAttendanceUnitStore();

const { attendanceUnit } = storeToRefs( attendanceUnitStore );
</script>
<template>
    <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-4">
        <div class="border-b-2 pb-3 mb-3">
            <h2 class="font-semibold">Unit Presensi Baru</h2>
        </div>
        <form action="" class="w-1/2">
            <div class="flex flex-col mb-4">
                <label for="">Nama Unit Presensi</label>
                <input placeholder="Unit Satu" type="text" v-model="attendanceUnit.name"
                    class="border-2 rounded-md px-2 py-1">
            </div>
            <div class="flex flex-col mb-4">
                <label for="">Identifier</label>
                <input placeholder="xxxx-xxxx-xxxx" type="text" v-model="attendanceUnit.identifier"
                    class="border-2 rounded-md px-2 py-1">
            </div>
            <button @click.prevent="attendanceUnitStore.store" class="text-white py-2 bg-blue-500 px-4 rounded-md text-xs">
                Masukkan Unit
            </button>
        </form>
    </div>
</template>