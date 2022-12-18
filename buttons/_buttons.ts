import { Client, ChatInputCommandInteraction, Interaction } from "discord.js";
import { ApplyGame } from "./applyGame";
import { Button } from "./_button"

export const Buttons = new Map<string, Button>()
Buttons.set(ApplyGame.id, ApplyGame)

export function AddButton(buttonId: string,
    client?: Client, 
    interaction?: Interaction,    
    id?: string
) {
    const buttonClass = Buttons.get(buttonId)
    return buttonClass?.getButton(client, interaction, id);
}