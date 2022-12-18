import { Client, ChatInputCommandInteraction, Interaction } from "discord.js";
import { AcceptApplication } from "./acceptApplication";
import { ApplyGame } from "./applyGame";
import { RejectApplication } from "./rejectApplication";
import { Button } from "./_button"

export const Buttons = new Map<string, Button>()
Buttons.set(ApplyGame.id, ApplyGame)
Buttons.set(AcceptApplication.id, AcceptApplication)
Buttons.set(RejectApplication.id, RejectApplication)

export function AddButton(buttonId: string,
    client?: Client, 
    interaction?: Interaction,    
    id?: string
) {
    const buttonClass = Buttons.get(buttonId)
    return buttonClass?.getButton(client, interaction, id);
}