import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType, ButtonBuilder, ButtonStyle, MessageActionRowComponentBuilder, CacheType, APIEmbedField } from "discord.js";
import { ApplyToGameModalConstants, CreateGameConstants, CreateGameModalConstants } from "../constants/createGame";
import { CREATE_GAME_TEMPLATE, CREATE_GAME_APPLICATION } from "../constants/createGameDescription";
import { GlobalConstants } from "../constants/global";
import { gameApplicationEmbed, getGameDetails } from "../functions/applyToGame";
import { createDiscussionThread, createApplicationThread, sendGameEmbed } from "../functions/createGame";
import { Modal } from "./_modal";

async function GetModal(client: Client, interaction: Interaction, id?: string) {
    if (interaction.isButton()){

        let {thread, message} = await getGameDetails(client, interaction.customId)
        var values = message.content.split('\n')
        var game: GameDetails = {
            gameName: values.shift() || '',
            dm: values.shift() || '',
            role: values.shift() || '',
            questions: values,
            thread: thread
        }

        const modal = new ModalBuilder()
            .setCustomId(ApplyToGameModalConstants.ID + GlobalConstants.ID_SEPARATOR + id)
            .setTitle(ApplyToGameModalConstants.MODAL_TITLE + game.gameName)

        const rows: ActionRowBuilder<TextInputBuilder>[] = []
        values.forEach((value) => {
            var textVal = new TextInputBuilder()
                .setCustomId(value.replace(/[^a-zA-Z]/g, ""))
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
                let {thread, message} = await getGameDetails(client, interaction.customId)
                var values = message.content.split('\n')
                var game: GameDetails = {
                    gameName: values.shift() || '',
                    dm: values.shift() || '',
                    role: values.shift() || '',
                    questions: values,
                    thread: thread
                }

                var answers: APIEmbedField[] = []    
                game.questions.forEach((value) => {
                    answers.push({
                        name: value,
                        value: submitted.fields.getTextInputValue(value.replace(/[^a-zA-Z]/g, ""))
                    }) 
                })

                await gameApplicationEmbed(
                    interaction.user, 
                    thread, 
                    game.gameName, 
                    answers, 
                    [interaction.user.id ,message.id].join(GlobalConstants.ID_SEPARATOR))
                
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

interface GameDetails {
    gameName: string;
    dm: string;
    role: string;
    questions: string[];
    thread: TextChannel;
}

export const ApplyToGame: Modal = {
    id: ApplyToGameModalConstants.ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}
