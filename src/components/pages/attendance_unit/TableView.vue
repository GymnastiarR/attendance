<script>

</script>
<template>
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
                <tr v-for="(unitPresensi, index) of listUnitPresensi">
                    <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                    <td class="px-3 h-12 text-sm">{{ unitPresensi.nama }}</td>
                    <td class="px-3 h-12 text-sm">
                        {{ unitPresensi.Kelas.length > 0 ? namaKelas(unitPresensi.Kelas) : 'Belum Ada' }}</td>
                    <td class="px-3 h-12 text-sm">{{ unitPresensi.identifier }}</td>
                    <!-- <td class="px-3 h-12 text-sm" v-text="siswa.uidRFID ? siswa.uidRFID : 'BELUM PUNYA'"></td> -->
                    <td class="text-center">
                        <button @click="() => { isShow = true; idUnitPresensi = unitPresensi.id }"
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
</template>