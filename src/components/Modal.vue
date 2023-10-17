<script>
export default {
    data() {
        return {
            siswa: {
                nama: "",
                nim: "",
                kelas: "",
            },
            modal: false
        };
    }
};
</script>

<template>
    <div v-show="modal"
        class="bg-black/10 drop-shadow-md fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        <div class="bg-white rounded-lg w-[30%] py-8 pb-10 px-14">
            <h2 class="text-center text-sm font-semibold mb-4">Input Siswa</h2>
            <form action="">
                <div class="flex flex-col mb-4 text-sm">
                    <label for="" class="mb-1">Nama</label>
                    <input v-model="siswa.nama" type="text" class="text-sm border-2 px-2 py-1 focus:outline-blue-400"
                        placeholder="Gymnastiar">
                </div>
                <div class="flex flex-col mb-4 text-sm">
                    <label for="" class="mb-1">NIS</label>
                    <input v-model="siswa.nis" type="text" class="text-sm border-2 px-2 py-1 focus:outline-blue-400"
                        placeholder="2110511015">
                </div>
                <div class="flex flex-col mb-4 text-sm">
                    <label for="" class="mb-1">Kelas</label>
                    <select v-model="siswa.kelas" class="text-sm border-2 px-2 py-1 focus:outline-blue-400">
                        <option value="" disabled>Masukkan Kelas</option>
                        <option value="0">Kosongkan Sementara</option>
                        <option :value="i.id" v-for="i in kelas">{{ i.Jurusan.nama }}</option>
                    </select>
                </div>
                <button class="bg-blue-500 text-center py-2 w-full text-sm text-white">Tambah
                    Mahasiswa</button>
            </form>
        </div>
    </div>
</template>