import { ActionRowBuilder, Client, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, TextChannel, APIEmbedField } from "discord.js";
import { ApplyToGameModalConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { gameApplicationEmbed } from "../functions/GameApplications/appEmbed";
import { Modal } from "./_modal";
import { Guid } from "guid-typescript";
//import { AddAppCreatedToNotion } from "../notion/applicationCreated";
import { GameEmbedDetails, getEmbedDetails } from "../functions/CreateGame/gameEmbed";

async function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isButton()){
        const game = getEmbedDetails(interaction.message)

        const uuid = Guid.create();
        const modal = new ModalBuilder()
            .setCustomId(ApplyToGameModalConstants.ID + GlobalConstants.ID_SEPARATOR + id + GlobalConstants.ID_SEPARATOR + uuid)
            .setTitle(ApplyToGameModalConstants.MODAL_TITLE + game.name)

        const rows: ActionRowBuilder<TextInputBuilder>[] = []
        game.questions.split('\n').forEach((value, index) => {
            var textVal = new TextInputBuilder()
                .setCustomId(index+value.replace(/[^a-zA-Z]/g, "").substring(0,40))
                .setLabel(value.substring(0,45))
                .setMaxLength(1024)
                .setStyle(TextInputStyle.Paragraph)
            var component = new ActionRowBuilder().addComponents(textVal) as ActionRowBuilder<TextInputBuilder>
            rows.push(component)
        });

        modal.addComponents(rows)
        return modal
    }
    return null
}

async function SubmitModal(client: Client, interaction: Interaction, modalId: string) {
    //NOTE: This method is called as soon as the modal renders. If you cancel and rerender the modal by clicking the button again
    // this is called twice, which means submitted is called twice, which means two applications.
    // Only one event is being fired, but you added two (or more) listeners to it
    // So they all act up when the event is fired.
    // This can be mitigated by only storing one such event (doesn't matter if first one, the submitted will always have latest info anyway)
    // Chainging Modal Id works, but it's a bad workaround, especially because it doesn't save your details
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const applicationThreadId = ids[1]
        const submitted = await interaction.awaitModalSubmit({
            time: 60000 * 30,
            filter: i => i.user.id === interaction.user.id
            && i.customId === modalId
        }).catch(error => {
            console.error(error)
            return null
        })
        if (submitted) {
            try {              
                const game = getEmbedDetails(interaction.message)
                log(interaction, game)

                const thread = await client.channels.fetch(applicationThreadId) as TextChannel
                var answers: APIEmbedField[] = []
                game.questions.split('\n').forEach((value, index) => {
                    answers.push({
                        name: value,
                        value: submitted.fields.getTextInputValue(index+value.replace(/[^a-zA-Z]/g, "").substring(0,40))
                    })
                })                
                await gameApplicationEmbed(interaction.message, interaction.user, thread!, game.name, answers)
                
                if (!submitted.replied) {
                    await submitted.reply({
                        content: ApplyToGameModalConstants.USER_MESSAGE + game.name,
                        ephemeral: true
                    })
                }                
                interaction.user.send(ApplyToGameModalConstants.USER_MESSAGE + game.name)

                AddAppCreatedToNotion(interaction.user.username,applicationThreadId)
            }
            catch (e) {
                console.error(e)
                if (!submitted.replied) {
                    await submitted.reply({
                        content: GlobalConstants.ERROR,
                        ephemeral: true
                    })
                }
            }
        }
    }
}

function log(interaction: Interaction, game: GameEmbedDetails){
    console.log("Application submitted by "+interaction.user.username + " for " + game.name)
}

export const ApplyToGame: Modal = {
    id: ApplyToGameModalConstants.ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}

