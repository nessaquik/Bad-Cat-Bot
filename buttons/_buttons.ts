import { Client, ChatInputCommandInteraction, Interaction } from "discord.js";
import { AcceptApplication } from "./acceptApplication";
import { ApplyGame } from "./applyGame";
import { EditGame } from "./editGame";
import { PauseGame } from "./pauseApplications";
import { PlayGame } from "./playApplications";
import { RejectApplication } from "./rejectApplication";
import { Button } from "./_button"

export const Buttons = new Map<string, Button>()
Buttons.set(ApplyGame.id, ApplyGame)
Buttons.set(EditGame.id, EditGame)
Buttons.set(AcceptApplication.id, AcceptApplication)
Buttons.set(RejectApplication.id, RejectApplication)
Buttons.set(PauseGame.id, PauseGame)
Buttons.set(PlayGame.id, PlayGame)

export function AddButton(buttonId: string,
    client?: Client, 
    interaction?: Interaction,    
    id?: string
) {
    const buttonClass = Buttons.get(buttonId)
    return buttonClass?.getButton(client, interaction, id);
}