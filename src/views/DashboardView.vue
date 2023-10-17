
<script>
import SideMenu from '../components/SideMenu.vue';
import axios from 'axios';
export default {
    components: {
        SideMenu
    },
    data() {
        return {
            kelas: []
        };
    },
};
</script>

<template>
    <div class="min-h-screen flex">
        <SideMenu />
        <main class="bg-[#F5F5F5] w-4/5">

        </main>
    </div>
</template>