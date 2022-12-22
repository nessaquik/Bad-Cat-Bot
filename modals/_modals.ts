import { Client, ChatInputCommandInteraction, Interaction } from "discord.js"
import { ApplyToGame } from "./applyToGame"
import { CreateGame } from "./createGame"
import { Modal } from "./_modal"

export const Modals = new Map<string, Modal>()
Modals.set(CreateGame.id, CreateGame)
Modals.set(ApplyToGame.id, ApplyToGame)

export async function AddModal(client: Client, 
    interaction: Interaction,
    modalId: string,
    id?: string
) {
    if (interaction.isChatInputCommand() || interaction.isButton()){
        const modalClass = Modals.get(modalId)
        const modal = await modalClass?.getModal(client, interaction, id);
        await interaction.showModal(modal!);        
        await modalClass?.sumbitModal(client, interaction, modal?.data.custom_id!)
    }
}