import { createRouter,createWebHistory} from "vue-router";
import routes from './detail'


console.log("routes = ", routes)
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;