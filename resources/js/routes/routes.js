// import modular routes
import webRoutes from "../modules/web/routes"
import templatesRoutes from "../modules/templates/routes"
import templatesRoutes1 from "../modules/templates1/routes"
import templatesRoutes2 from "../modules/templates2/routes"
import authRoutes from "../modules/auth/routes"
import userRoutes from "../modules/user/routes"
import articleRoutes from "../modules/article/routes"

export default [...webRoutes, ...authRoutes, ...userRoutes, ...articleRoutes, ...templatesRoutes, ...templatesRoutes1, ...templatesRoutes2]
