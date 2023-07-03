import { ActionRowBuilder, Client, Interaction, ModalBuilder, TextInputBuilder, TextInputStyle, TextChannel, Channel } from "discord.js";
import { CreateGameConstants, CreateGameModalConstants } from "../constants/createGame";
import { CreateGameTemplate, CREATE_GAME_APPLICATION, GAME_DETAILS_SEPARATOR } from "../constants/createGameDescription";
import { GlobalConstants } from "../constants/global";
import { createDiscussionThread, createApplicationThread, getGameFormat } from "../functions/CreateGame/gameBase";
import { AddGameToNotion } from "../notion/gameCreated";
import { Modal } from "./_modal";
import { createGameLocation } from "../functions/CreateGame/gameLocation";
import { sendGameEmbed } from "../functions/CreateGame/gameEmbed";
import { addRoleToUserId, addUserToChannel, createRole } from "../functions/_Base/commonMethods";

function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isChatInputCommand()){
        const modal = new ModalBuilder()
            .setCustomId(CreateGameModalConstants.ID+ GlobalConstants.ID_SEPARATOR +id)
            .setTitle(CreateGameModalConstants.MODAL_TITLE)

        const gameName = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.NAME_ID)
            .setLabel(CreateGameModalConstants.NAME_LABEL)
            .setStyle(TextInputStyle.Short)
            .setMaxLength(31)

        const gameDescription = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.DESC_ID)
            .setLabel(CreateGameModalConstants.DESC_LABEL)
            .setStyle(TextInputStyle.Paragraph)

        const gameTemplate = new TextInputBuilder()
            .setCustomId(CreateGameModalConstants.TEMPLATE_ID)
            .setLabel(CreateGameModalConstants.TEMPLATE_LABEL)
            .setValue(CreateGameTemplate.join(GAME_DETAILS_SEPARATOR + "\n"))
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
                var gameFormat = getGameFormat(template)

                const dm = interaction.options.getUser(CreateGameConstants.DM_OPTION)
                const dmId: string = dm?.id || ''
                const dmEmbed: string = dm?.toString() || ''
                const ispublic: boolean = interaction.options.getString(CreateGameConstants.PRIVACY_OPTION) == CreateGameConstants.PRIVACY_OPTION_PUBLIC
                var gameLocation: Channel | null = interaction.options.getChannel(CreateGameConstants.CHANNEL_OPTION);
                var hasLocationProvided = gameLocation != null
                var role: string = interaction.options.getRole(CreateGameConstants.ROLE_OPTION)?.name || ''

                if (!submitted.replied) {
                    await submitted.reply({
                        content: CreateGameConstants.REPLY,
                        ephemeral: true
                    })
                }

                var channel = interaction.channel as TextChannel

                //Create a role if one is not specified
                if (role == '' && interaction.guild){
                    var newRole = await createRole(interaction.guild, name)
                    role = newRole?.name || ''
                }
                await addRoleToUserId(dmId, role, client, interaction); 
                await addUserToChannel(dmId, channel);
                const threadURL = await createDiscussionThread(channel, name, dmId)
                const applicationThread = await createApplicationThread(channel, name, dmId, role, questions, ispublic)
                if (!gameLocation){
                    gameLocation = await createGameLocation(interaction, gameFormat, name, role)!
                }                
                await sendGameEmbed(channel, name, desc, template, questions, dmEmbed, role, gameLocation, applicationThread.id, threadURL)

                //This is temporary to increase visibility of the option
                if (gameFormat.toLowerCase().indexOf("ongoing") != -1 && !hasLocationProvided){
                    channel.send(CreateGameConstants.PROMOTE_CHANNEL_USAGE)
                }
                               
                AddGameToNotion(applicationThread.id, name, dm?.username!, gameFormat)
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
