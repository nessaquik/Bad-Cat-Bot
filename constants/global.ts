import { PermissionFlagsBits } from "discord.js"

export abstract class GlobalConstants {
    static readonly THUMBNAIL = "https://cdn.discordapp.com/avatars/1053571349425172480/f8b2eec90e6f9b630dfd1e3df6326a34.png"
    static readonly ERROR = "An error occured. Blame Chava!"
    static readonly ID_SEPARATOR = '_'
    static readonly Permissions = PermissionFlagsBits.ModerateMembers
    static readonly Shabbat = ":tada: SHABBOS IS HERE! SHABBAT SHALOM! :tada:\nWE'RE SO HAPPY. WE'RE GONNA SING AND DANCE. \nSIX DAYS A WEEK WE WAIT FOR SHABBAT, A GIFT FROM HASHEM. THE MOST PRECIOUS OF DAYS. \n\n\nAll of which is to say Rivka isn't here right now. Sorry."
}