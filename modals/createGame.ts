import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, CacheType } from "discord.js";
import { CreateGameConstants, CreateGameModalConstants } from "../constants/createGame";
import { CREATE_GAME_TEMPLATE, CREATE_GAME_APPLICATION } from "../constants/createGameDescription";
import { GlobalConstants } from "../constants/global";
import { addRole } from "../functions/applyToGame";
import { createDiscussionThread, createApplicationThread, sendGameEmbed } from "../functions/createGame";
import { AddGameToNotion } from "../notion/gameCreated";
import { Modal } from "./_modal";

function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isChatInputCommand()){
        const modal = new ModalBuilder()
            .setCustomId(CreateGameModalConstants.ID+ GlobalConstants.ID_SEPARATOR +id)
            .setTitle(CreateGameModalConstants.MODAL_TITLE)

        const gameName = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.NAME_ID)
            .setLabel(CreateGameModalConstants.NAME_LABEL)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(35)

        const gameDescription = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.DESC_ID)
            .setLabel(CreateGameModalConstants.DESC_LABEL)
            .setStyle(TextInputStyle.Paragraph)

        const gameTemplate = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.TEMPLATE_ID)
            .setLabel(CreateGameModalConstants.TEMPLATE_LABEL)
            .setValue(CREATE_GAME_TEMPLATE)
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(1024)

        const applicationQuestion = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.QUESTIONS_ID)
            .setLabel(CreateGameModalConstants.QUESTIONS_LABEL)
            .setValue(CREATE_GAME_APPLICATION)
            .setStyle(TextInputStyle.Paragraph)

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
    if (interaction.isChatInputCommand()){
        const submitted = await interaction.awaitModalSubmit({
            time: 60000 * 30,
            filter: i => i.user.id === interaction.user.id 
            && i.customId === modalId
            && i.customId.split(GlobalConstants.ID_SEPARATOR).length > 1 
            && i.customId.split(GlobalConstants.ID_SEPARATOR)[1] == interaction.id,
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

                const dm = interaction.options.getUser(CreateGameConstants.DM_OPTION)
                const dmId: string = dm?.id || ''
                const dmEmbed: string = dm?.toString() || ''
                const role: string = interaction.options.getRole(CreateGameConstants.ROLE_OPTION)?.name || ''
                const ispublic: boolean = interaction.options.getString(CreateGameConstants.PRIVACY_OPTION) == CreateGameConstants.PRIVACY_OPTION_PUBLIC

                var channel = interaction.channel as TextChannel

                await addRole(dmId, role, client, interaction); 
                await createDiscussionThread(channel, name, dmId)
                const id = await createApplicationThread(channel, name, dmId, role, questions, ispublic)
                await sendGameEmbed(channel, name, desc, template, questions, dmEmbed, id)

                AddGameToNotion(id.split(GlobalConstants.ID_SEPARATOR)[1], name, dm?.username!)

                if (!submitted.replied) {
                    await submitted.reply({
                        content: CreateGameConstants.REPLY,
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

function log(interaction: Interaction){
    console.log("Game created by "+interaction.user.username)
}

export const CreateGame: Modal = {
    id: CreateGameModalConstants.ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}

