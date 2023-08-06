import { TextChannel, ChannelType, Client } from "discord.js";
import { CreateGameThreadConstants } from "../../constants/createGame";
import { GameInfoHeader } from "../../constants/createGameDescription";
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
    return thread
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

export async function getAboutDMMessage(client: Client, dm: string){
    const aboutDMChannel = client.channels.cache.get(process.env.ABOUTDMID!)  as TextChannel;
    var aboutDMMessagURL
    var messages = await aboutDMChannel.messages.fetch({ limit: 100})
    messages.forEach(msg => {
        if (msg.author.id === dm) {
            aboutDMMessagURL = msg.url
        }
    });
    return aboutDMMessagURL;
}
