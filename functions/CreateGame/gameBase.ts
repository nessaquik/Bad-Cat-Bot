import { TextChannel, ChannelType } from "discord.js";
import { CreateGameThreadConstants } from "../../constants/createGame";
import { GameInfoHeader } from "../../constants/createGameDescription";
import { GlobalConstants } from "../../constants/global";
import dotenv from 'dotenv';
dotenv.config()

export async function createDiscussionThread(channel: TextChannel,
    gameName: string,
    dm: string) {
    const thread = await channel?.threads.create({
        name: CreateGameThreadConstants.DISCUSSION_THREAD_NAME + gameName,
    })
    await thread.members.add(dm)
    return thread.url
}

export async function createApplicationThread(channel: TextChannel,
    gameName: string,
    dm: string,
    role: string,
    questions: string,
    ispublic: boolean) {
    const thread = await channel?.threads.create({
        name: CreateGameThreadConstants.APPLICATION_THREAD_NAME + gameName,
        type: ispublic ? ChannelType.PublicThread : ChannelType.PrivateThread,
    })
    await thread.members.add(dm);

    //NOTE: This is read in getGameValues. Don't modify without changing that function
    //This is just a cheap ass way of saving DB money
    var message = await thread.send(["0", gameName, dm, role, questions].join('\n'))
    return message
}

export function getGameFormat(gameDetails: string){
    var gameDetailsList = gameDetails.split('\n')
    for (var detail of gameDetailsList){
        if (detail.includes(GameInfoHeader.FORMAT)){
            return detail.replace(GameInfoHeader.FORMAT, "").replace(/[^a-zA-Z0-9]/g, '')
        }
    }
    return ""
}

