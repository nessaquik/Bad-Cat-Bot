import { CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { Command } from "./_command";

const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if this interaction is responsive');

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.reply("pong");
}

export const Ping: Command = {
    command: command.toJSON(),
    execute: execute
}