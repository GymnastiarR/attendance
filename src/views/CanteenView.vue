<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import CreateShop from '../components/pages/canteen/CreateShop.vue';
import { useShopStore } from '../stores/shop';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';

const shopStore = useShopStore();

const { shops } = storeToRefs( shopStore );

onBeforeMount( () => {
    shopStore.getAll();
} );

</script>

<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <CreateShop />
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <div class="border-b-2 pb-4 mb-3">
                    <h1 class="text-sm font-semibold">Daftar Kantin</h1>
                </div>
                <!-- <SearchForm @replace-listSiswa="(newListSiswa) => { listSiswa = newListSiswa }" /> -->
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Nama</th>
                            <th class="text-left px-3 text-sm">Penyewa</th>
                            <th class="text-left px-3 text-sm">Jumlah Produk</th>
                            <th>Action</th>
                        </tr>

                    </thead>
                    <tbody v-if="shops !== null">
                        <tr v-for="(shop, index) of shops">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ shop.name }}</td>
                            <td class="px-3 h-12 text-sm">{{ shop._count.Menu }}</td>
                            <td class="px-3 h-12 text-sm">Gymnastiar</td>
                            <td class="flex flex-wrap lg:h-12 justify-center items-center">
                                Lihat Detail
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="shops === null" class="w-full mt-4">
                    <p class="text-center text-xl text-gray-800 font-semibold">
                        Tidak Ada Siswa Yang Terdaftar
                    </p>
                </div>
            </div>
        </AppLayout>
    </div>
</template>