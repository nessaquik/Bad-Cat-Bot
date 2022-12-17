import { ActionRowBuilder, Client, CommandInteraction, ChatInputCommandInteraction, ModalBuilder, SlashCommandBuilder, SlashCommandUserOption, TextInputBuilder, TextInputStyle } from "discord.js";
import { CreateGame as CreateGameModal } from "../modals/createGameModal";
import { Command } from "./_command";

const command = new SlashCommandBuilder()
    .setName('creategame')
    .setDescription('Create a new game')
    .addUserOption(option =>option
        .setName('dm')
        .setDescription('DM for the game')
        .setRequired(true))
    .addRoleOption(option =>option
        .setName('role')
        .setDescription('Role to be added for accepted application')
        .setRequired(true))
    .addChannelOption(option =>option
        .setName('channel')
        .setDescription('Channel where applications should go')
        .setRequired(true))

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    const modal = CreateGameModal.getModal(client, interaction);
    await interaction.showModal(modal);    
    await CreateGameModal.sumbitModal(client, interaction)    
}

export const CreateGame: Command = {
    command: command.toJSON(),
    execute: execute
}