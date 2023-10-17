<script>
import SideMenu from '../components/SideMenu.vue';

export default {
    components: { SideMenu },
    data() {
        return {};
    },
};
</script>
<template>
    <div class="flex">
        <SideMenu />
        <main class="w-4/5 bg-[#F5F5F5] p-8">
            <div class="bg-white drop-shadow-md rounded-md py-6">
                <div class="px-8 border-b-2 pb-4 mb-4">
                    <h1 class="font-semibold">Jurusan</h1>
                </div>
                <form action="" class="px-8">
                    <div class="flex flex-col mb-2">
                        <label for="" class="mb-1">Nama Juruan</label>
                        <input type="text" class="px-2 py-1 rounded-md border-2 ">
                    </div>
                    <button class="text-xs px-3 py-2 bg-blue-500 rounded-md">Buat Jurusan</button>
                </form>
            </div>
        </main>
    </div>
</template>