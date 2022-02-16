import { Router } from "express";
import {
  create,
  deleting,
  getByCEP,
  getByCPF,
  list,
  login,
  update,
} from "./controllers/user.controller";
import { isAuthenticated } from "./middlewares/authentication.middleware";
import { validate } from "./middlewares/validate.middleware";
import { UserSchema } from "./schemas/UserSchema";

const router = Router();

router.post("/register", validate(UserSchema), create);
router.get("/users", list);
router.post("/login", login);
router.patch("/users", isAuthenticated, update);
router.delete("/users", isAuthenticated, deleting);
router.get("/cpf/:cpf", getByCPF);
router.get("/cep/:cep", getByCEP);
export default router;
