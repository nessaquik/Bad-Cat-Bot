import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, Client, Interaction, ModalBuilder } from "discord.js";

export interface Button
{
    id: string,
    getButton: (client?: Client, interaction?: Interaction, id?: string) => ActionRowBuilder<ButtonBuilder>
    execute: (client:Client, interaction: ButtonInteraction) => void;
}