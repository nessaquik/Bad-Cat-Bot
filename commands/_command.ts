import { SlashCommandBuilder, Client, CommandInteraction, ChatInputApplicationCommandData, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export interface Command
{
    command: RESTPostAPIChatInputApplicationCommandsJSONBody,
    execute: (client:Client, interaction: CommandInteraction) => void;
}