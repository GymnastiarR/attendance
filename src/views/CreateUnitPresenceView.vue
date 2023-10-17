<script setup>
import { useAttendanceUnitStore } from '../stores/attendanceUnit';

const attendanceUnitStore = useAttendanceUnitStore();

const { attendanceUnit } = storeToRefs( attendanceUnitStore );


</script>

<template>
    <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-4">
        <div class="border-b-2 pb-3 mb-3">
            <h2 class="font-semibold">Buat Unit Presensi Baru</h2>
        </div>
        <form action="" class="w-1/2">
            <div class="flex flex-col mb-4">
                <label for="">Name</label>
                <input placeholder="IPA" type="text" v-model="attendanceUnit.name" class="border-2 rounded-md px-2 py-1">
            </div>
            <div class="flex flex-col mb-4">
                <label for="">Identifier</label>
                <input placeholder="IPA" type="text" v-model="attendanceUnit.identifier"
                    class="border-2 rounded-md px-2 py-1">
            </div>
            <button @click.prevent="attendanceUnitStore.store" class="text-white py-2 bg-blue-500 px-4 rounded-md text-xs">
                Buat Jurusan
            </button>
        </form>
    </div>
</template>