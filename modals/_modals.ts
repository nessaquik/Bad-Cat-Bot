import { Client, ChatInputCommandInteraction } from "discord.js"
import { CreateGame } from "./createGame"
import { Modal } from "./_modal"

export const Modals = new Map<string, Modal>()
Modals.set(CreateGame.id, CreateGame)

export async function AddModal(client: Client, 
    interaction: ChatInputCommandInteraction,
    modalId: string,
    id?: string
) {
    const modalClass = Modals.get(modalId)
    const modal = modalClass?.getModal(client, interaction, id);
    await interaction.showModal(modal!);    
    await modalClass?.sumbitModal(client, interaction)
}