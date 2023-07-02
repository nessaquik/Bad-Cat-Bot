import { ButtonInteraction, Client, Guild, Interaction, Message, RoleCreateOptions, RoleManager, TextChannel, User } from "discord.js";
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

export async function addRoleToUserId(
    userId: string,
    roleName: string,
    client: Client, 
    interaction: Interaction){
    var user = await client.users.fetch(userId);
    await addRoleToUser(user, roleName, client, interaction)
}

export async function addRoleToUser(
    user: User,
    roleName: string,
    client: Client, 
    interaction: Interaction){
    var role = interaction.guild?.roles.cache.find(role => role.name === roleName)
    var member = await interaction.guild?.members.fetch(user)
    await member?.roles.add(role!) 
}

export async function removeRoleFromUser(
    user: User,
    roleName: string,
    client: Client, 
    interaction: Interaction){
    var role = interaction.guild?.roles.cache.find(role => role.name === roleName)
    var member = await interaction.guild?.members.fetch(user)
    await member?.roles.remove(role!) 
}

export async function isDM(
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

export async function isDMorUser(
    game: GameEmbedDetails,
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

export function getIdFromMention(mention: string) {
	const matches = mention.match(/^<@!?(\d+)>$/);
	if (!matches) return;

	// The first element in the matches array will be the entire mention, not just the ID,
	return matches[1];
}

export function getCustomId(message:Message){
    //This method is written this way because once upon a time, I made the stupid mistake of changing IDs hardcoded into the code.
    //Earlier, it used to be a combination of userId and a messageId referring to a message in the Applications channel
    //Now, it has only userId (or something else)
    //To maintain backward compatibility, this is the easiest approach, keep the ids what they were, do not change them.
    var firstRow = message.components[0]!
    var firstButtonId = firstRow.components[0]!.customId!;

    var customId = firstButtonId.substring(firstButtonId.indexOf(GlobalConstants.ID_SEPARATOR)+1)
    return firstButtonId==customId ? "" : customId
}


//!-------------------------------legacy methods-------------------------------!

export async function isDM_LEGACY(
    //Legacy: This needs to be removed in Stage 3
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

export async function isDMorUser_LEGACY(
    //Legacy: This needs to be removed in Stage 3
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

export enum ApplicationAction {
    Accept,
    Reject,
    Remove
}