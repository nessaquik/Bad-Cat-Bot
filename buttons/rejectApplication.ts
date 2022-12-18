import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, ChatInputCommandInteraction, Client, CommandInteraction, Interaction, SlashCommandBuilder, User } from "discord.js";
import { AcceptApplicationButtonConstants, ApplyGameButtonConstants, ApplyToGameModalConstants, RejectApplicationButtonConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";
import { getGameDetails } from "../functions/applyToGame";
import { AddModal } from "../modals/_modals";
import { Button } from "./_button";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    const applyButton = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(RejectApplicationButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(RejectApplicationButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
    );
    return applyButton
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)

        const userId = ids[1]
        const messageId = ids[2]
        const message = await interaction.channel?.messages.fetch(messageId)

        var values = message?.content.split('\n')
        var gameName = values?.shift() || ''
        var dm= values?.shift() || ''
        var roleName= values?.shift() || ''

        if (interaction.user.id != dm){
            await interaction.reply({
                content: "AYO! You are SO NOT the DM!",
                ephemeral: true
            });
        }
        else{            
            var user = await client.users.fetch(userId);
            user.send("Sorry, the DM decided to go with someone else for " + gameName)
            await interaction.reply("Application Rejected - " + user.username );
        }

    }
}

export const RejectApplication: Button = {
    id: RejectApplicationButtonConstants.ID,
    getButton: getButton,
    execute: execute
}