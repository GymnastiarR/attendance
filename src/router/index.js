import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';
import KelasView from '../views/KelasView.vue';

const router = createRouter( {
  history: createWebHistory( import.meta.env.BASE_URL ),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( '../views/AboutView.vue' )
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import( '../views/DashboardView.vue' ),
      meta: {
        loginRequired: true
      }
    },
    {
      path: '/siswa',
      name: 'siswa',
      component: () => import( '../views/StudentView.vue' )
    },
    // {
    //   path: '/siswa/:id',
    //   name: 'siswa-detail',
    //   component: () => import( '../views/SiswaDetailView.vue' )
    // },
    // {
    //   path: '/siswa/:id/edit',
    //   name: 'siswa-edit',
    //   component: () => import( '../views/SiswaEditView.vue' )
    // },
    {
      path: '/kelas/:id',
      name: 'kelas-detail',
      component: () => import( '../views/DetailKelasView.vue' )
    },
    {
      path: '/rfid/',
      name: 'rfid',
      component: () => import( '../views/AssignRFIDView.vue' )
    },
    {
      path: '/siswa/:id/rfid',
      name: 'siswa-rfid',
      component: () => import( '../views/AssignRFIDView.vue' )
    },
    {
      path: '/kelas',
      name: 'kelas',
      component: () => import( '../views/KelasView.vue' )
    },
    {
      path: '/tahun-ajaran',
      name: 'tahun-ajaran',
      component: () => import( '../views/TahunAjaranView.vue' )
    },
    {
      path: '/jurusan',
      name: 'jurusan',
      component: () => import( '../views/JurusanView.vue' )
    },
    {
      path: '/informasi-sekolah',
      name: 'informasi-sekolah',
      component: () => import( '../views/SchoolInformationView.vue' )
    },
    {
      path: '/unit-presensi',
      name: 'unit-presensi',
      component: () => import( '../views/UnitPresensiView.vue' )
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( '../views/LoginView.vue' )
    },
    {
      path: '/presensi',
      name: 'presensi',
      component: () => import( '../views/PresensiView.vue' )
    },
    {
      path: '/siswa/:id/presensi',
      name: 'Siswa Presensi',
      component: () => import( '../views/StudentAttendance.vue' )
    },
    {
      path: '/kantin',
      name: 'canteen',
      component: () => import( '../views/CanteenView.vue' )
    },
    {
      path: '/kantin/:id',
      name: 'detail canteen',
      component: () => import( '../views/DetailShop.vue' )
    },
  ]
} );

// router.beforeEach( ( to, from, next ) => {

//   // if(to.loginRequired && )
// } );

export default router;
