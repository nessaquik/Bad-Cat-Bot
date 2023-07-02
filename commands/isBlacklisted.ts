import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { GlobalConstants } from "../constants/global";
import { IsBlacklistedConstants } from "../constants/IsItBlacklisted";
import { AddUserToBlacklist } from "../notion/blacklistCheck";
import { Command } from "./_command";

const command = new SlashCommandBuilder()
    .setName(IsBlacklistedConstants.COMMAND_NAME)
    .setDescription(IsBlacklistedConstants.COMMAND_DESCRIPTION)
    .addUserOption(option =>option
        .setName(IsBlacklistedConstants.USER_OPTION)
        .setDescription(IsBlacklistedConstants.USER_DESC)
        .setRequired(true))
    .setDefaultMemberPermissions(GlobalConstants.Permissions)
    .setDMPermission(false);

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    log(interaction)
    const user = interaction.options.getUser(IsBlacklistedConstants.USER_OPTION)
    if (user != null && user.id != null){
        var added = await AddUserToBlacklist(user.username, user.id)
        if (added){
            await interaction.reply({ 
                content: IsBlacklistedConstants.COMMAND_REPLY,
                ephemeral: true})
        }
        else{
            await interaction.reply({ 
                content: GlobalConstants.ERROR,
                ephemeral: true})
        }        
    }
    else{
        await interaction.reply({ 
            content: GlobalConstants.ERROR,
            ephemeral: true})
    }
}

function log(interaction: ChatInputCommandInteraction){
    const user = interaction.options.getUser(IsBlacklistedConstants.USER_OPTION)
    console.log(interaction.user.username + " tried to add " + user?.username + " to the blacklist.")
}

export const IsBlacklisted: Command = {
    id: IsBlacklistedConstants.COMMAND_NAME,
    command: command.toJSON(),
    execute: execute
}