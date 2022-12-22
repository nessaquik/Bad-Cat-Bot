import { Client, Interaction, TextBasedChannel, TextChannel } from "discord.js";
import { GlobalConstants } from "../constants/global";

export interface GameDetails {
    acceptedUsers: number;
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

    var game = await getGameDetailsFromThread(thread, messageId)
    return game
}

export async function getGameDetailsFromThread(
    thread: TextBasedChannel, 
    messageId: string){
    const message = await thread.messages.fetch(messageId)
    var values = message.content.split('\n')
    var game: GameDetails = {
        acceptedUsers: parseInt(values.shift() || "0"),
        gameName: values.shift() || '',
        dm: values.shift() || '',
        role: values.shift() || '',
        questions: values.slice(0,5),
        messageId: messageId,
        threadId: thread.id,
        thread: thread,
    }
    return game
}

export async function incrementAcceptedCount(
    thread: TextBasedChannel, 
    messageId: string){
    const message = await thread.messages.fetch(messageId)
    var values = message.content.split('\n')
    values.unshift((parseInt(values.shift() || "0") + 1).toString())
    await message.edit(values.join('\n'));
    var game: GameDetails = {
        acceptedUsers: parseInt(values.shift() || "0"),
        gameName: values.shift() || '',
        dm: values.shift() || '',
        role: values.shift() || '',
        questions: values.slice(0,5),
        messageId: messageId,
        threadId: thread.id,
        thread: thread,
    }
    return game
}