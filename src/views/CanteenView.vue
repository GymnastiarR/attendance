<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import CreateShop from '../components/pages/canteen/CreateShop.vue';
import { useShopStore } from '../stores/shop';
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia';
import { useWarningStore } from '../stores/warning';

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
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <div class="pb-4 mb-3 border-b-2">
                    <h1 class="text-sm font-semibold">Daftar Kantin</h1>
                </div>
                <!-- <SearchForm @replace-listSiswa="(newListSiswa) => { listSiswa = newListSiswa }" /> -->
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="px-3 text-sm text-left">No</th>
                            <th class="px-3 text-sm text-left">Nama</th>
                            <th class="px-3 text-sm text-left">Penyewa</th>
                            <th class="px-3 text-sm text-left">Jumlah Produk</th>
                            <th>Action</th>
                        </tr>

                    </thead>
                    <tbody v-if="shops !== null">
                        <tr v-for="(shop, index) of shops">
                            <td class="h-12 px-3 text-sm">{{ index + 1 }}</td>
                            <td class="h-12 px-3 text-sm">{{ shop.name }}</td>
                            <td class="h-12 px-3 text-sm">{{ shop._count.Menu }}</td>
                            <td class="h-12 px-3 text-sm">Gymnastiar</td>
                            <td class="flex flex-wrap items-center justify-center lg:h-12">
                                <RouterLink :to="{ name: 'detail canteen', params: { id: shop.id } }"
                                    class="px-4 py-2 mx-1 mb-1 text-xs text-white bg-blue-400 rounded-lg">
                                    Lihat Detail
                                </RouterLink>
                                <button
                                    @click="useWarningStore().callWarning('Apakah anda yakin akan menghapus item?', shopStore.destroyCanteen(shop.id))"
                                    class="px-4 py-2 mx-1 mb-1 text-xs text-white bg-blue-400 rounded-lg">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="shops === null" class="w-full mt-4">
                    <p class="text-xl font-semibold text-center text-gray-800">
                        Tidak Ada Siswa Yang Terdaftar
                    </p>
                </div>
            </div>
        </AppLayout>
    </div>
</template>