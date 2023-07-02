import { ButtonBuilder, ButtonInteraction, ButtonStyle, Client, Interaction } from "discord.js";
import { PlayGameButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { Button } from "../_button";
import { editApplicationState } from "../../functions/CreateGame/gameEmbed";

function getButton(client?: Client, interaction?: Interaction, id?: string) {
    return new ButtonBuilder()
            .setCustomId(PlayGameButtonConstants.ID)
            .setLabel(PlayGameButtonConstants.TITLE)
            .setStyle(ButtonStyle.Success)
}

async function execute(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        log(interaction)
        await editApplicationState(client, interaction, false)      
    }
}

function log(interaction: ButtonInteraction){
    console.log("Applications reenabled by " + interaction.user.username)
}

export const PlayGame: Button = {
    id: PlayGameButtonConstants.ID,
    getButton: getButton,
    execute: execute
}
