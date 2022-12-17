import { SlashCommandBuilder, Client, CommandInteraction, ChatInputApplicationCommandData, RESTPostAPIChatInputApplicationCommandsJSONBody, Interaction, ChatInputCommandInteraction } from "discord.js";

export interface Command
{
    command: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (client:Client, interaction: ChatInputCommandInteraction) => void;
}