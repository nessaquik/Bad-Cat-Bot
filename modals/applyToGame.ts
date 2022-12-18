import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, CacheType } from "discord.js";
import { ApplyToGameModalConstants, CreateGameConstants, CreateGameModalConstants } from "../constants/createGame";
import { CREATE_GAME_TEMPLATE, CREATE_GAME_APPLICATION } from "../constants/createGameDescription";
import { GlobalConstants } from "../constants/global";
import { gameApplicationEmbed, getGameMessage } from "../functions/applyToGame";
import { createDiscussionThread, createApplicationThread, sendGameEmbed } from "../functions/createGame";
import { Modal } from "./_modal";

async function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isButton()){
        const values = await getGameMessage(client, interaction)
        const gameName = values.shift()
        const dm = values.shift()
        const role = values.shift()

        const modal = new ModalBuilder()
            .setCustomId(ApplyToGameModalConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setTitle(ApplyToGameModalConstants.MODAL_TITLE + gameName)

        const rows: ActionRowBuilder<TextInputBuilder>[] = []
        values.forEach((value) => {
            var textVal = new TextInputBuilder()
                .setCustomId(value)
                .setLabel(value)
                .setStyle(TextInputStyle.Paragraph)
            var component = new ActionRowBuilder().addComponents(textVal) as ActionRowBuilder<TextInputBuilder>
            rows.push(component)
        });

        modal.addComponents(rows)
        return modal
    }
    return null
}

async function SubmitModal(client: Client, interaction: Interaction) {
    if (interaction.isButton()){
        const submitted = await interaction.awaitModalSubmit({
            time: 60000 * 10,
            filter: i => i.user.id === interaction.user.id 
            && i.customId === ApplyToGameModalConstants.ID + GlobalConstants.ID_SEPARATOR + interaction.user.id
        }).catch(error => {
            console.error(error)
            return null
        })
        if (submitted) {
            try {
                
                await gameApplicationEmbed(client, interaction, submitted)
                
                if (!submitted.replied) {
                    await submitted.reply({
                        content: ApplyToGameModalConstants.REPLY,
                        ephemeral: true
                    })
                }
                // const name = submitted.fields.getTextInputValue(CreateGameModalConstants.NAME_ID)
                // const desc = submitted.fields.getTextInputValue(CreateGameModalConstants.DESC_ID)
                // const template = submitted.fields.getTextInputValue(CreateGameModalConstants.TEMPLATE_ID)
                // const questions = submitted.fields.getTextInputValue(CreateGameModalConstants.QUESTIONS_ID)

                // const dm = interaction.options.getUser(CreateGameConstants.DM_OPTION)
                // const dmId: string = dm?.id || ''
                // const dmEmbed: string = dm?.toString() || ''
                // const role: string = interaction.options.getRole(CreateGameConstants.ROLE_OPTION)?.name || ''

                // var channel = interaction.channel as TextChannel

                // await createDiscussionThread(channel, name, dmId)
                // const id = await createApplicationThread(channel, name, dmId, role, questions)
                // await sendGameEmbed(channel, name, desc, template, questions, dmEmbed, id)

                // if (!submitted.replied) {
                //     await submitted.reply({
                //         content: CreateGameConstants.REPLY,
                //         ephemeral: true
                //     })
                // }
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
