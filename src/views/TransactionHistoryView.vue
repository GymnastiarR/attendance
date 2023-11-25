<script setup>
import { ref, onBeforeMount } from 'vue';
import AppLayout from '../layouts/AppLayout.vue';
import SideMenu from '../components/SideMenu.vue';
import { useShopStore } from '../stores/shop';
import { useRoute } from 'vue-router';

const $router = useRoute();

const shopStore = useShopStore();
const canteenId = ref( $router.params.id );
const histories = ref( [] );

onBeforeMount( async () => {
    const result = await shopStore.getHistory( canteenId.value );
    histories.value = result;
} );
</script>

<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <div class="px-8 py-6 mb-3 bg-white rounded-md drop-shadow-md">
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="px-3 text-sm text-left">No</th>
                            <th class="px-3 text-sm text-left">Tanggal Transaksi</th>
                            <th class="px-3 text-sm text-left">Total</th>
                            <!-- <th class="px-3 text-sm text-left">Jumlah Produk</th> -->
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(history, index) of histories">
                            <td class="h-12 px-3 text-sm">{{ index + 1 }}</td>
                            <td class="h-12 px-3 text-sm">{{ history.date }}</td>
                            <td class="h-12 px-3 text-sm">{{ history.totalAmount }}</td>
                            <td class="h-12 px-3 text-sm">Gymnastiar</td>
                            <td class="flex flex-wrap items-center justify-center lg:h-12">
                                Lihat Detail
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    </div>
</template>