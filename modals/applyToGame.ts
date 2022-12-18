import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, CacheType, APIEmbedField } from "discord.js";
import { CreateGameConstants, CreateGameModalConstants } from "../constants/createGame";
import { CREATE_GAME_TEMPLATE, CREATE_GAME_APPLICATION } from "../constants/createGameDescription";
import { ApplyToGameModalConstants } from "../constants/gameApplication";
import { GlobalConstants } from "../constants/global";
import { gameApplicationEmbed } from "../functions/applyToGame";
import { createDiscussionThread, createApplicationThread, sendGameEmbed } from "../functions/createGame";
import { getGameDetails, GameDetails } from "../functions/gameDetails";
import { Modal } from "./_modal";

async function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isButton()){
        const ids = interaction.customId.split(GlobalConstants.ID_SEPARATOR)
        const threadId = ids[1]
        const messageId = ids[2]
        var game: GameDetails = await getGameDetails(client, threadId, messageId)

        const modal = new ModalBuilder()
            .setCustomId(ApplyToGameModalConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setTitle(ApplyToGameModalConstants.MODAL_TITLE + game.gameName)

        const rows: ActionRowBuilder<TextInputBuilder>[] = []
        game.questions.forEach((value, index) => {
            var textVal = new TextInputBuilder()
                .setCustomId(index+value.replace(/[^a-zA-Z]/g, ""))
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
                //TODO: REDUNDANT CALLS - REDUCE IMMEDIATELY!!!    
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
                
                if (!submitted.replied) {
                    await submitted.reply({
                        content: ApplyToGameModalConstants.REPLY,
                        ephemeral: true
                    })
                }

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
