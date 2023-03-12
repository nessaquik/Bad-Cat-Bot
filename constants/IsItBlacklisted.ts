export abstract class IsItBlacklistedConstants {
    static readonly COMMAND_NAME = "isitblacklisted"
    static readonly COMMAND_DESCRIPTION = "Is this user added to our super secret blacklist. I recomment you DO NOT use this in public."
    static readonly COMMAND_REPLY_FALSE = " is most likely fine, though I can't be sure."
    static readonly COMMAND_REPLY_TRUE = " IS IN THE BLACKLIST. Proceed with caution(?)"
    static readonly USER_OPTION = 'user';
    static readonly USER_DESC = 'Mention the user you want to test'
}

export abstract class IsBlacklistedConstants {
    static readonly COMMAND_NAME = "adduser"
    static readonly COMMAND_DESCRIPTION = "Add a user to the blacklist."
    static readonly COMMAND_REPLY = "Successfully Added."
    static readonly USER_OPTION = 'user';
    static readonly USER_DESC = 'Mention the user you want to add to the blacklist'
}