import { ActionRowBuilder, Client, Interaction, CommandInteractionOptionResolver, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ChatInputCommandInteraction } from "discord.js";
import { Modal } from "./_modal";

const ID = "create_game"
function GetModal(client:Client, interaction: ChatInputCommandInteraction){
    const modal = new ModalBuilder()
			.setCustomId(ID)
			.setTitle('Create a new game');

    const dm: string = interaction.options.getUser('dm')?.username || ''
    const channel: string = interaction.options.getChannel('channel')?.name || ''
    const role: string = interaction.options.getRole('role')?.name || ''

    const favoriteColorInput = new TextInputBuilder()
        .setCustomId('gameTitle')
        .setLabel("Game Name")
        .setStyle(TextInputStyle.Short);

    const hobbiesInput = new TextInputBuilder()
        .setCustomId('gameDesc')
        .setLabel("Game Description")
        .setStyle(TextInputStyle.Paragraph);

    const DMInput = new TextInputBuilder()
        .setCustomId('details')
        .setLabel("Otehr Details")
        .setValue(dm + role + channel)
        .setStyle(TextInputStyle.Short);

    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput) as ActionRowBuilder<TextInputBuilder>;
    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput) as ActionRowBuilder<TextInputBuilder>;
    const thirdActionRow = new ActionRowBuilder().addComponents(DMInput) as ActionRowBuilder<TextInputBuilder>;
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

    return modal;
}

async function SubmitModal(client:Client, interaction: ChatInputCommandInteraction){
    const submitted = await interaction.awaitModalSubmit({
        time: 60000,
        filter: i => i.user.id === interaction.user.id,
    }).catch(error => {
        console.error(error)
        return null
    })
    if (submitted) {
        const name = submitted.fields.getTextInputValue('gameTitle');
        const desc = submitted.fields.getTextInputValue('gameDesc');
        await submitted.reply({ content: 'Your submission was received successfully! ' + name + " " + desc });
    }
}

export const CreateGame: Modal = {
    id: ID,
    getModal: GetModal,
    sumbitModal: SubmitModal
}