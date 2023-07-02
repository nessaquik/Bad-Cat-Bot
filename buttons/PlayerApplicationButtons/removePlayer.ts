import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { RemovePlayerButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { Button } from "../_button";
import { ApplicationAction } from "../../functions/_Base/commonMethods";
import { applicationAction } from "../../functions/GameApplications/appAction";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(RemovePlayerButtonConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setLabel(RemovePlayerButtonConstants.TITLE)
            .setStyle(ButtonStyle.Danger)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
        await applicationAction(client, interaction, ApplicationAction.Remove)
    }
}

function log(interaction: ButtonInteraction){
    console.log("Player removed by " + interaction.user.username + " with id " + interaction.customId)
}

export const RemovePlayer: Button = {
    id: RemovePlayerButtonConstants.ID,
    getButton: getButton,
    execute: execute
}