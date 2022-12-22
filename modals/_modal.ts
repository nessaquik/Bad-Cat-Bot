import { Client, ChatInputCommandInteraction, ModalBuilder, Integration, CacheType, Interaction } from "discord.js";

export interface Modal
{
    id: string,
    getModal: (client: Client, interaction: Interaction, id?: string) => Promise<ModalBuilder | null>
    sumbitModal: (client:Client, interaction: Interaction, modalId: string) => void;
}