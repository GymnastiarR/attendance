<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useShopStore } from '../stores/shop';
import { onBeforeMount, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { useWarningStore } from '../stores/warning';
import DataEditable from '../components/pages/canteen/DataEditable.vue';

const $route = ref( useRoute() );
const shopStore = useShopStore();

const { show } = storeToRefs( shopStore );

onBeforeMount( async () => {
    shopStore.get( $route.value.params.id );
} );

</script>

<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <div class="pb-4 mb-3 border-b-2">
                    <h1 class="text-sm font-semibold">Detail Kantin</h1>
                </div>
                <div>
                    <table class="mb-3">
                        <tr>
                            <td>Name</td>
                            <td class="px-2">:</td>
                            <td>{{ show?.name }}</td>
                        </tr>
                        <tr>
                            <td>Saldo</td>
                            <td class="px-2">:</td>
                            <td>Rp. {{ show?.sum.find(item => item.isPaid === false)?._sum.totalAmount || '0' }}</td>
                        </tr>
                    </table>
                    <button @click="shopStore.withdraw($route.params.id)"
                        class="px-4 py-2 text-white bg-blue-500 rounded-lg">Cairkan Saldo</button>
                    <!-- <rou :href="$router.go('')" class="px-4 py-2 text-white bg-blue-500 rounded-lg">Lihat History Transaksi</a> -->
                    <RouterLink class="px-4 py-2 text-white bg-blue-500 rounded-lg"
                        :to="{ name: 'transaction history', params: { id: $route.params.id } }">Lihat History
                        Transaksi</RouterLink>
                </div>
            </div>
        </AppLayout>
    </div>
</template>