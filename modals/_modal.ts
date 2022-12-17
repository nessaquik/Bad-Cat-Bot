import { Client, ChatInputCommandInteraction, ModalBuilder } from "discord.js";

export interface Modal
{
    id: string,
    getModal: (client: Client, interaction: ChatInputCommandInteraction) => ModalBuilder,
    sumbitModal: (client:Client, interaction: ChatInputCommandInteraction) => void;
}