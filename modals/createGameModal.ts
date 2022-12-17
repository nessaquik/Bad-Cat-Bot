import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction, EmbedBuilder, ModalSubmitInteraction, TextBasedChannel, TextChannel, ChannelType } from "discord.js";
import { CreateGameApplication, CreateGameTemplate } from "../constants/createGameDescription";
import { Modal } from "./_modal";

const ID = "create_game"
function GetModal(client:Client, interaction: ChatInputCommandInteraction){
    const modal = new ModalBuilder()
			.setCustomId(ID)
			.setTitle('Create a new game')

    const gameName = new TextInputBuilder()
        .setCustomId('gameTitle')
        .setLabel("Game Name")
        .setStyle(TextInputStyle.Short)

    const gameDescription = new TextInputBuilder()
        .setCustomId('gameDesc')
        .setLabel("Tell us a little about the game")
        .setStyle(TextInputStyle.Paragraph)

    const gameTemplate =  new TextInputBuilder()
        .setCustomId('gameTemplate')
        .setLabel("Fill out this template")
        .setValue(CreateGameTemplate)
        .setStyle(TextInputStyle.Paragraph)

    const applicationQuestion =  new TextInputBuilder()
        .setCustomId('gameQuestions')
        .setLabel("Player Application")
        .setValue(CreateGameApplication)
        .setStyle(TextInputStyle.Paragraph)

    const rows = [
        new ActionRowBuilder().addComponents(gameName) as ActionRowBuilder<TextInputBuilder>,
        new ActionRowBuilder().addComponents(gameDescription) as ActionRowBuilder<TextInputBuilder>,
        new ActionRowBuilder().addComponents(gameTemplate) as ActionRowBuilder<TextInputBuilder>,
        new ActionRowBuilder().addComponents(applicationQuestion) as ActionRowBuilder<TextInputBuilder>]
    modal.addComponents(rows)

    return modal
}

async function SubmitModal(client:Client, interaction: ChatInputCommandInteraction){    
    const dm: string = interaction.options.getUser('dm')?.username || ''
    const role: string = interaction.options.getRole('role')?.name || ''

    const submitted = await interaction.awaitModalSubmit({
        time: 60000 * 10,
        filter: i => i.user.id === interaction.user.id,
    }).catch(error => {
        console.error(error)
        return null
    })
    if (submitted) {
        try{
            await sendGameEmbed(interaction, submitted)
            await createDiscussionThread(interaction, submitted)
            await createApplicationThread(interaction,submitted)
            if (!submitted.replied){
                await submitted.reply({ 
                    content: 'Your submission was received successfully! ',
                    ephemeral: true
                })
            }
        }
        catch (e){
            console.error(e)
        }
    }
}

async function sendGameEmbed(interaction: ChatInputCommandInteraction, submitted: ModalSubmitInteraction){
    const name = submitted.fields.getTextInputValue('gameTitle')
    const desc = submitted.fields.getTextInputValue('gameDesc')
    const template = submitted.fields.getTextInputValue('gameTemplate')
    const questions = submitted.fields.getTextInputValue('gameQuestions')

    const dm: string = interaction.options.getUser('dm')?.toString() || ''
    const role: string = interaction.options.getRole('role')?.name || ''

    const embed = new EmbedBuilder()
	.setTitle(name)
    .setColor("#9B59B6")
	.setDescription(desc)
	.setThumbnail('https://cdn.discordapp.com/avatars/1053571349425172480/f8b2eec90e6f9b630dfd1e3df6326a34.png')
	.addFields(
        { name: 'DM', value: dm },
		{ name: 'Game Details', value: template },
		{ name: 'Appliction', value: questions },
	)
	.setTimestamp()
	.setFooter({ text: 'Chief of Operations, at your service!'})

    await interaction.channel?.send({embeds: [embed]})
}

async function createDiscussionThread(interaction: ChatInputCommandInteraction, submitted: ModalSubmitInteraction){
    const name = submitted.fields.getTextInputValue('gameTitle')
    const dm: string = interaction.options.getUser('dm')?.id || ''
    var channel = interaction.channel as TextChannel
    const thread = await channel?.threads.create({
        name: `Discussion and Questions for ${name}`,
        reason: 'Separate thread for conversations',
    })
    await thread.members.add(dm);
}

async function createApplicationThread(interaction: ChatInputCommandInteraction, submitted: ModalSubmitInteraction){
    const name = submitted.fields.getTextInputValue('gameTitle')
    const dm: string = interaction.options.getUser('dm')?.id || ''
    var channel = interaction.channel as TextChannel
    const thread = await channel?.threads.create({
        name: `Application for ${name}`,
        type: ChannelType.PrivateThread,
        reason: 'Separate thread for conversations',
    })
    await thread.members.add(dm);
}

export const CreateGame: Modal = {
    id: ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}