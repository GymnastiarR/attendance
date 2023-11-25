
<script>
import SideMenu from '../components/SideMenu.vue';
import { IconCloseFill, IconMail, IconPerson, IconSick } from '../components/icons';
import AppLayout from '../layouts/AppLayout.vue';
import { Call } from '../services/Calling';

export default {
    components: {
        SideMenu,
        AppLayout,
        IconPerson,
        IconSick,
        IconMail,
        IconCloseFill
    },
    data() {
        return {
            data: []
        };
    },
    methods: {
        getData() {
            return new Promise( ( resolve, reject ) => {
                Call.get( '/dashboard', ( error, response ) => {
                    if ( error ) {
                        reject( error );
                    }
                    resolve( response );
                } );
            } );
        },
        presence( attendance, status ) {
            // console.log( attendance );
            const result = attendance?.find( ( item ) => item.status === status );
            if ( result ) return result;
            return { status: status, _count: { status: 0 } };
        }
    },
    async beforeMount() {
        try {
            this.data = ( await this.getData() ).data.data;
        } catch ( error ) {
            console.log( error );
        }
    }
};
</script>

<template>
    <div class="flex min-h-screen">
        <SideMenu />
        <AppLayout>
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <p class="mb-4 font-semibold">Informasi Kehadiran Hari Ini</p>
                <div class="flex flex-wrap justify-between">
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-green-500 rounded-md w-60 grow">
                        <IconPerson />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Hadir').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Hadir')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-blue-500 rounded-md w-60 grow">
                        <IconSick />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Sakit').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Sakit')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-orange-500 rounded-md w-60 grow">
                        <IconMail />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Izin').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Izin')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-red-500 rounded-md w-60 grow">
                        <IconCloseFill />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Alpa').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(data.attendanceStatus, 'Alpa')._count.status }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    </div>
</template>