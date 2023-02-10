import { CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";
import { LisetteReactionsConstants } from "../constants/lisetteReactions";
import { LisetteReactions } from "../constants/resources";
import { Command } from "./_command";

const command = new SlashCommandBuilder()
    .setName(LisetteReactionsConstants.COMMAND_NAME)
    .setDescription(LisetteReactionsConstants.COMMAND_DESCRIPTION);

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    var image = LisetteReactions.Images[Math.floor(Math.random() * LisetteReactions.Images.length)]
    await interaction.reply({files: [image]});
}

export const Lisette: Command = {
    id: LisetteReactionsConstants.COMMAND_NAME,
    command: command.toJSON(),
    execute: execute
}