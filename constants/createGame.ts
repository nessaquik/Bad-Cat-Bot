export abstract class CreateGameConstants {
    static readonly COMMAND_NAME = 'creategame'
    static readonly COMMAND_DESC = 'Create a new game'
    static readonly DM_OPTION = 'dm';
    static readonly DM_DESC = 'DM for the game'
    static readonly ROLE_OPTION = 'role';
    static readonly ROLE_DESC = 'Role to be added for accepted application'
    static readonly CHANNEL_OPTION = 'channel';
    static readonly CHANNEL_DESC = 'If you already have a channel or category for this game, pass it here or Formulate will create one';
    static readonly PRIVACY_OPTION = 'visbility';
    static readonly PRIVACY_DESC = 'Should the applications be publicaly visible'
    static readonly PRIVACY_OPTION_PUBLIC = 'public';
    static readonly PRIVACY_OPTION_PRIVATE = 'private';
    static readonly REPLY = 'Input parsed successfully, game is being created!'
    static readonly PROMOTE_CHANNEL_USAGE = 'Hello Mx. game creator! I noticed this app is for an ongoing campaign.\nIf you know the category/channel for this campaign, consider using the channel option during create to provide a link to it'
}

export abstract class CreateGameThreadConstants{
    static readonly DISCUSSION_THREAD_NAME = "Discussion and Questions for "
    static readonly APPLICATION_THREAD_NAME = "Applications for "
}

export abstract class CreateGameEmbedConstants{
    static readonly EMBED_COLOR = "#9B59B6"
    static readonly FOOTER = 'If I am unavailable, it is probably Shabbos!'
    static readonly DM = "DM"
    static readonly GAME_DETAILS = "Game Details"
    static readonly APPLICATION = "Application"
    static readonly THREAD = "Got Questions?"
    static readonly CHANNEL = "Game Channel"
    static readonly ROLE = "Game Role"
    static readonly ACCEPTED_COUNT = "Accepted Users"
    static readonly ABOUT_DM = "DM Info"
    static readonly UNAVAILABLE = "*Go bother the DM for it*"
    static readonly SEE_DISCUSSION_THREAD = "See Discussion Thread"
    static readonly ABOUT_DM_MESSAGE = "See DM Style"
}


export abstract class CreateGameModalConstants{
    static readonly ID = "create-game"
    static readonly MODAL_TITLE = 'Create a new game'
    static readonly NAME_ID = 'gameName';
    static readonly NAME_LABEL = 'Game Name'
    static readonly DESC_ID = 'gameDesc';
    static readonly DESC_LABEL = 'Tell us a little about the game'    
    static readonly TEMPLATE_ID = 'gameTemplate';
    static readonly TEMPLATE_LABEL = 'Fill out this template'   
    static readonly QUESTIONS_ID = 'gameQuestions';
    static readonly QUESTIONS_LABEL = 'Player Application (5 questions only ERIK!)'
}

export abstract class EditGameModalConstants{
    static readonly ID = "edit-game"
    static readonly MODAL_TITLE = 'Edit game details'
    static readonly REPLY = 'The game was successfully edited!'
    static readonly PERMISSIONS = 'Only the admins can edit a posted game.'
}

export abstract class CreateGameChannelConstants{
    static readonly CHANNEL_NAME = "ooc-chat"
    static readonly OS_CHANNEL_CREATED = '*The channel for this one shot can be found at* - '
    static readonly CAMAPIGN_CHANNEL_CREATED = '*The category for this game can be found at* - '
}