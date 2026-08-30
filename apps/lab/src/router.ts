import { createRouter, createWebHistory } from 'vue-router'
import ScenarioCatalogPage from './pages/ScenarioCatalogPage.vue'
import SearchRacePage from './pages/SearchRacePage.vue'
import MutualExclusionPage from './pages/MutualExclusionPage.vue'
import BoundedConcurrencyPage from './pages/BoundedConcurrencyPage.vue'
import SingleFlightPage from './pages/SingleFlightPage.vue'
import CrossTabPage from './pages/CrossTabPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/scenarios' },
    { path: '/scenarios', component: ScenarioCatalogPage },
    { path: '/scenario/search-race/compare', component: SearchRacePage },
    { path: '/scenario/mutual-exclusion/compare', component: MutualExclusionPage },
    { path: '/scenario/bounded-concurrency/compare', component: BoundedConcurrencyPage },
    { path: '/scenario/single-flight/compare', component: SingleFlightPage },
    { path: '/scenario/cross-tab/compare', component: CrossTabPage },
    { path: '/:pathMatch(.*)*', redirect: '/scenarios' },
  ],
})
