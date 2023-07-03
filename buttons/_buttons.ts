import { Client, Interaction } from "discord.js";
import { AcceptApplication } from "./PlayerApplicationButtons/acceptApplication";
import { ApplyGame } from "./GameButtons/applyGame";
import { EditGame } from "./GameButtons/editGame";
import { PauseGame } from "./GameButtons/pauseApplications";
import { PlayGame } from "./GameButtons/playApplications";
import { RejectApplication } from "./PlayerApplicationButtons/rejectApplication";
import { Button } from "./_button";
import { RemovePlayer } from "./PlayerApplicationButtons/removePlayer";
import { DeleteGame } from "./GameButtons/deleteApplications";

export const Buttons = new Map<string, Button>()
Buttons.set(ApplyGame.id, ApplyGame)
Buttons.set(EditGame.id, EditGame)
Buttons.set(AcceptApplication.id, AcceptApplication)
Buttons.set(RejectApplication.id, RejectApplication)
Buttons.set(PauseGame.id, PauseGame)
Buttons.set(PlayGame.id, PlayGame)
Buttons.set(RemovePlayer.id, RemovePlayer)
Buttons.set(DeleteGame.id, DeleteGame)

export function AddButton(buttonId: string,
    client?: Client, 
    interaction?: Interaction,    
    id?: string
) {
    const buttonClass = Buttons.get(buttonId)
    return buttonClass?.getButton(client, interaction, id);
}