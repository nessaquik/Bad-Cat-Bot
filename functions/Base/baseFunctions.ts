import { ButtonInteraction, Client, Guild, RoleCreateOptions, RoleManager, TextChannel, User, UserMention } from "discord.js";
import { PlayGameButtonConstants } from "../../constants/gameApplication";
import { GlobalConstants } from "../../constants/global";
import { GameDetails } from "../gameDetails";
import { GameEmbedDetails } from "../CreateGame/gameEmbed";

export async function addUserToChannel(userId: string, channel: TextChannel){
    await channel.permissionOverwrites.edit(userId, { ViewChannel: true, SendMessages: true });
}

export async function createRole(guild: Guild, roleName: string){
    var roleOptions: RoleCreateOptions = {}
    roleOptions.name = roleName.replace(/[^a-zA-Z0-9 ]/g, '')
    var roleManager = guild?.roles as RoleManager
    var role = await roleManager.create(roleOptions)
    return role
}

export async function isDMNew(
    game: GameEmbedDetails,
    interaction: ButtonInteraction){
        if (interaction.user.id == getIdFromMention(game.dm)){
            return true;
        }
        else{
            await interaction.reply({
                content: GlobalConstants.NOT_THE_DM,
                ephemeral: true
            });
        } 
        return false;
}

export function getIdFromMention(mention: string) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;

	// The first element in the matches array will be the entire mention, not just the ID,
	return matches[1];
}


//!-------------------------------Temp Methods to be removed-------------------------------!

export async function isDM(
    //Task: This needs to be removed in Stage 3
    game: GameDetails,
    interaction: ButtonInteraction){
        if (interaction.user.id == game.dm){
            return true;
        }
        else{
            await interaction.reply({
                content: GlobalConstants.NOT_THE_DM,
                ephemeral: true
            });
        } 
        return false;
}

export async function isDMorUser(
    //Task: This needs to be removed in Stage 3
    game: GameDetails,
    user: User,
    interaction: ButtonInteraction){
        if (interaction.user.id == game.dm || interaction.user.id == user.id){
            return true;
        }
        else{
            await interaction.reply({
                content: GlobalConstants.NOT_THE_DM,
                ephemeral: true
            });
        } 
        return false;
}