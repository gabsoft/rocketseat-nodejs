import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController"
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSendComplimentController = new ListUserSendComplimentsController()
const listUserReceiveComplimentController = new ListUserReceiveComplimentsController()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAuthenticated ,ensureAdmin ,createTagController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)
router.post('/login' ,authenticateUserController.handle)
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentController.handle)
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentController.handle) 




export { router }