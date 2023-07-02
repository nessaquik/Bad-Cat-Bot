import { ButtonBuilder, ButtonInteraction, Client, Interaction } from "discord.js";

export interface Button
{
    id: string,
    getButton: (client?: Client, interaction?: Interaction, id?: string) => ButtonBuilder
    execute: (client:Client, interaction: ButtonInteraction) => void;
}