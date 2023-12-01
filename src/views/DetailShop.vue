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

const menu = reactive( {
    name: '',
    price: '',
} );

const showModal = ref( false );

const handleNewMenu = () => {
    shopStore.storeMenu( $route.value.params.id, menu );
    menu.name = '';
    menu.price = '';
    showModal.value = false;
};

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
            <div class="py-6 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <p class="px-8 mb-4">Daftar Menu</p>
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-2 py-1 ">No</th>
                            <th class="px-2 py-1 text-left ">Nama</th>
                            <th class="px-2 py-1 text-left ">Harga</th>
                            <th class="px-2 py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="show?.Menu" v-for="(menu, index) in show.Menu">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td class="px-2 py-2 w-52">
                                <DataEditable v-model:value="menu.name"
                                    :callback="shopStore.updateName(menu.id, menu.name, $route.params.id)" />
                            </td>
                            <td class="px-2 py-2"><span>Rp. </span>
                                <DataEditable v-model:value="menu.Price[0].price"
                                    :callback="shopStore.updatePrice(menu.id, menu.Price[0].price, $route.params.id)" />
                            </td>
                            <td class="flex justify-center gap-2 px-2 py-2">
                                <button
                                    @click="useWarningStore().callWarning('Apakah Anda Yakin Akan Menghapus Menu?', shopStore.destroyMenu($route.params.id, menu.id))"
                                    class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button @click="showModal = true" class="px-4 py-2 text-white bg-blue-500 rounded-lg">Tambah Menu</button>
            </div>
            <div @click="showModal = false" v-show="showModal"
                class="fixed inset-0 bg-black/25 flex justify-center items-center z-10">
                <form class="bg-white w-1/3 rounded-lg px-10 py-8 min-w-[520px]">
                    <h3 class="font-semibold mb-5">Menu Baru</h3>
                    <div class="flex flex-col mb-3">
                        <label for="" class="mb-2">Nama Menu</label>
                        <input type="text" class="border-2 px-2 py-1" v-model="menu.name">
                    </div>
                    <div class="flex flex-col mb-3">
                        <label for="" class="mb-2">Harga Menu</label>
                        <input type="text" class="border-2 px-2 py-1" v-model="menu.price">
                    </div>
                    <button @click.prevent="handleNewMenu" class="bg-blue-700 text-white px-4 py-2 rounded-md">Simpan
                        Menu</button>
                </form>
            </div>
        </AppLayout>
    </div>
</template>