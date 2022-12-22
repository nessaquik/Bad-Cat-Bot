import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, CacheType, APIEmbedField } from "discord.js";
import { CreateGameConstants, CreateGameModalConstants } from "../constants/createGame";
import { CREATE_GAME_TEMPLATE, CREATE_GAME_APPLICATION } from "../constants/createGameDescription";
import { ApplyGameButtonConstants, ApplyToGameModalConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { gameApplicationEmbed } from "../functions/applyToGame";
import { getGameDetails, GameDetails } from "../functions/gameDetails";
import { Modal } from "./_modal";
import { Guid } from "guid-typescript";

async function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const threadId = ids[1]
        const messageId = ids[2]
        var game: GameDetails = await getGameDetails(client, threadId, messageId)

        const uuid = Guid.create();
        const modal = new ModalBuilder()
            .setCustomId(ApplyToGameModalConstants.ID + GlobalConstants.ID_SEPARATOR + id + GlobalConstants.ID_SEPARATOR + uuid)
            .setTitle(ApplyToGameModalConstants.MODAL_TITLE + game.gameName)

        const rows: ActionRowBuilder<TextInputBuilder>[] = []
        game.questions.forEach((value, index) => {
            var textVal = new TextInputBuilder()
                .setCustomId(index+value.replace(/[^a-zA-Z]/g, ""))
                .setLabel(value)
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
    // So they all act up when they event is fired.
    // This can be mitigated by only storing one such event (doesn't matter if first one, the submitted will always have latest info anyway)
    // Chainging Modal Id works, but it's a bad workaround, especially because it doesn't save your details
    if (interaction.isButton()){
        const submitted = await interaction.awaitModalSubmit({
            time: 60000 * 10,
            filter: i => i.user.id === interaction.user.id
            && i.customId === modalId
        }).catch(error => {
            console.error(error)
            return null
        })
        if (submitted) {
            try {              
                const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
                const threadId = ids[1]
                const messageId = ids[2]
                var game: GameDetails = await getGameDetails(client, threadId, messageId)

                var answers: APIEmbedField[] = []
                game.questions.forEach((value, index) => {
                    answers.push({
                        name: value,
                        value: submitted.fields.getTextInputValue(index+value.replace(/[^a-zA-Z]/g, ""))
                    })
                })

                await gameApplicationEmbed(
                    interaction.user,
                    game.thread!,
                    game.gameName,
                    answers,
                    [interaction.user.id, game.messageId].join(GlobalConstants.ID_SEPARATOR))

                interaction.user.send(ApplyToGameModalConstants.DM + game.gameName)
                if (!submitted.replied) {
                    await submitted.reply({
                        content: ApplyToGameModalConstants.DM + game.gameName,
                        ephemeral: true
                    })
                }
            }
            catch (e) {
                console.error(e)
            }
        }
    }
}

export const ApplyToGame: Modal = {
    id: ApplyToGameModalConstants.ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}
