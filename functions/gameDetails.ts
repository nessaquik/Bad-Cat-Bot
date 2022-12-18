import { Client, Interaction, TextBasedChannel, TextChannel } from "discord.js";
import { GlobalConstants } from "../constants/global";

export interface GameDetails {
    gameName: string;
    dm: string;
    role: string;
    questions: string[];
    messageId: string,
    threadId: string,
    thread?: TextBasedChannel;
}

export async function getGameDetails(
    client: Client, 
    threadId: string,
    messageId: string){
    const thread = await client.channels.fetch(threadId) as TextBasedChannel

    var game = await getGameDetailsHelper(thread, messageId)
    return game
}

export async function getGameDetailsFromThread(
    thread: TextBasedChannel, 
    messageId: string){
    var game = await getGameDetailsHelper(thread, messageId)
    return game
}

async function getGameDetailsHelper(thread: TextBasedChannel, messageId: string){
    const message = await thread.messages.fetch(messageId)
    var values = message.content.split('\n')
    var game: GameDetails = {
        gameName: values.shift() || '',
        dm: values.shift() || '',
        role: values.shift() || '',
        questions: values,
        messageId: messageId,
        threadId: thread.id,
        thread: thread,
    }
    return game
}