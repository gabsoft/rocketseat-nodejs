import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"

class ListUserReceiveComplimentsService {

    async execute(user_id: string) {
        const complimentsRespositorie = getCustomRepository(ComplimentsRepositories)

        const compliments = await complimentsRespositorie.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        })

        return compliments
    }

}

export { ListUserReceiveComplimentsService }