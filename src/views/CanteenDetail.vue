<script setup>
import SideMenu from '../components/SideMenu.vue';
import SectionView from '../components/SectionView.vue';

</script>

<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <SectionView>
                <h1>Helli Dunia</h1>
            </SectionView>
        </AppLayout>
    </div>
</template>