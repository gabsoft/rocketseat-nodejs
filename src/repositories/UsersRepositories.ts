import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepostitories extends Repository<User> {}

export { UsersRepostitories };
