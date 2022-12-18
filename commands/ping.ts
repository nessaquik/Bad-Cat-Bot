import { CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { PingConstants } from "../constants/ping";
import { Command } from "./_command";

const command = new SlashCommandBuilder()
    .setName(PingConstants.COMMAND_NAME)
    .setDescription(PingConstants.COMMAND_DESCRIPTION);

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.reply(PingConstants.COMMAND_REPLY);
}

export const Ping: Command = {
    id: PingConstants.COMMAND_NAME,
    command: command.toJSON(),
    execute: execute
}