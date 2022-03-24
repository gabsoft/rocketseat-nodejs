import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"


interface ITagRequest {
    name: string
}

class CreateTagService {
    async execute({ name }: ITagRequest) {

        const tagRepository = getCustomRepository(TagsRepositories)

        if(!name){
            throw new Error("Invalid Name")
        }

        const tagAlreadyExist = await tagRepository.findOne({
            name
        })

        if (tagAlreadyExist) {
            throw new Error("Tag already existis")
        }

        const tag = tagRepository.create({
            name
        })

        await tagRepository.save(tag)

        return tag
    }
}

export { CreateTagService }