import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, CacheType } from "discord.js";
import { CreateGameConstants, CreateGameModalConstants, EditGameModalConstants } from "../constants/createGame";
import { GlobalConstants } from "../constants/global";
import { addRole } from "../functions/applyToGame";
import { getGameEmbed, editGameEmbed } from "../functions/createGame";
import { editGameDetails, GameDetails, getGameDetails } from "../functions/gameDetails";
import { Modal } from "./_modal";

function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isButton()){
        const values = getGameEmbed(interaction.message)
        const modal = new ModalBuilder()
            .setCustomId(EditGameModalConstants.ID+ GlobalConstants.ID_SEPARATOR +id)
            .setTitle(EditGameModalConstants.MODAL_TITLE)

        const gameName = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.NAME_ID)
            .setLabel(CreateGameModalConstants.NAME_LABEL)
            .setStyle(TextInputStyle.Short)
            .setValue(values.shift()!)

        const gameDescription = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.DESC_ID)
            .setLabel(CreateGameModalConstants.DESC_LABEL)
            .setStyle(TextInputStyle.Paragraph)
            .setValue(values.shift()!)

        //DM
        values.shift()

        const gameTemplate = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.TEMPLATE_ID)
            .setLabel(CreateGameModalConstants.TEMPLATE_LABEL)
            .setStyle(TextInputStyle.Paragraph)
            .setValue(values.shift()!)

        const applicationQuestion = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.QUESTIONS_ID)
            .setLabel(CreateGameModalConstants.QUESTIONS_LABEL)
            .setStyle(TextInputStyle.Paragraph)
            .setValue(values.shift()!)

        const rows = [
            new ActionRowBuilder().addComponents(gameName) as ActionRowBuilder<TextInputBuilder>,
            new ActionRowBuilder().addComponents(gameDescription) as ActionRowBuilder<TextInputBuilder>,
            new ActionRowBuilder().addComponents(gameTemplate) as ActionRowBuilder<TextInputBuilder>,
            new ActionRowBuilder().addComponents(applicationQuestion) as ActionRowBuilder<TextInputBuilder>]
        modal.addComponents(rows)
        return Promise.resolve(modal)
    }
    return Promise.resolve(null)
}

async function SubmitModal(client: Client, interaction: Interaction, modalId: string) {
    if (interaction.isButton()){
        const submitted = await interaction.awaitModalSubmit({
            time: 60000 * 10,
            filter: i => i.user.id === interaction.user.id 
            && i.customId === modalId
            && i.customId.split(GlobalConstants.ID_SEPARATOR).length > 1 
            && i.customId.split(GlobalConstants.ID_SEPARATOR)[1] == interaction.user.id,
        }).catch(error => {
            console.error(error)
            return null
        })
        if (submitted) {
            try {
                log(interaction)
                const name = submitted.fields.getTextInputValue(CreateGameModalConstants.NAME_ID)
                const desc = submitted.fields.getTextInputValue(CreateGameModalConstants.DESC_ID)
                const template = submitted.fields.getTextInputValue(CreateGameModalConstants.TEMPLATE_ID)
                const questions = submitted.fields.getTextInputValue(CreateGameModalConstants.QUESTIONS_ID)
                const values = getGameEmbed(interaction.message)

                const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
                const threadId = ids[1]
                const messageId = ids[2]

                await editGameDetails(client, threadId, messageId, name, questions)
                await editGameEmbed(interaction.message, name, desc, template, questions, values[2])

                await submitted.reply({
                    content: EditGameModalConstants.REPLY,
                    ephemeral: true
                })
            }
            catch (e) {
                console.error(e)
            }
        }
    }
}

function log(interaction: Interaction){
    console.log("Game edited by "+interaction.user.username)
}

export const EditGame: Modal = {
    id: EditGameModalConstants.ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}

