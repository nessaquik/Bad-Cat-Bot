import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";
import { GlobalConstants } from "../constants/global";
import { IsItBlacklistedConstants } from "../constants/IsItBlacklisted";
import { FindUserInBlacklist } from "../notion/blacklistCheck";
import { Command } from "./_command";

const command = new SlashCommandBuilder()
    .setName(IsItBlacklistedConstants.COMMAND_NAME)
    .setDescription(IsItBlacklistedConstants.COMMAND_DESCRIPTION)
    .addUserOption(option =>option
        .setName(IsItBlacklistedConstants.USER_OPTION)
        .setDescription(IsItBlacklistedConstants.USER_DESC)
        .setRequired(true))
    .setDefaultMemberPermissions(GlobalConstants.Permissions)
    .setDMPermission(false);

async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    log(interaction)
    const user = interaction.options.getUser(IsItBlacklistedConstants.USER_OPTION)
    if (user != null && user.id != null){
        var isBlacklisted = await FindUserInBlacklist(user.id)
        if (isBlacklisted){
            await interaction.reply(user.username + IsItBlacklistedConstants.COMMAND_REPLY_TRUE);
        }
        else{
            await interaction.reply(user.username + IsItBlacklistedConstants.COMMAND_REPLY_FALSE);
        }
    }
    else{
        await interaction.reply(GlobalConstants.ERROR);
    }
}

function log(interaction: ChatInputCommandInteraction){
    const user = interaction.options.getUser(IsItBlacklistedConstants.USER_OPTION)
    console.log(interaction.user.username + " tried to find if " + user?.username + " is blacklisted!")
}

export const IsItBlacklisted: Command = {
    id: IsItBlacklistedConstants.COMMAND_NAME,
    command: command.toJSON(),
    execute: execute
}