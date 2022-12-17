import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "./_command";

const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if this interaction is responsive');

export const Ping: Command = {
    command: pingCommand.toJSON(),
    execute: async (client: Client, interaction: CommandInteraction) => {
        await interaction.reply("PONG!");
    }
}