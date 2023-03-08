export abstract class CreateGameConstants {
    static readonly COMMAND_NAME = 'creategame'
    static readonly COMMAND_DESC = 'Create a new game'
    static readonly DM_OPTION = 'dm';
    static readonly DM_DESC = 'DM for the game'
    static readonly ROLE_OPTION = 'role';
    static readonly ROLE_DESC = 'Role to be added for accepted application'
    static readonly PRIVACY_OPTION = 'visbility';
    static readonly PRIVACY_DESC = 'Should the applications be publicaly visible'
    static readonly PRIVACY_OPTION_PUBLIC = 'public';
    static readonly PRIVACY_OPTION_PRIVATE = 'private';
    static readonly REPLY = 'The game was successfully created!'
    static readonly CHANNEL_CREATION_MESSAGE = '*This feature is experimental. The channel for this game can be found at* - '
}

export abstract class CreateGameThreadConstants{
    static readonly DISCUSSION_THREAD_NAME = "Discussion and Questions for "
    static readonly APPLICATION_THREAD_NAME = "Applications for "
}

export abstract class CreateGameEmbedConstants{
    static readonly EMBED_COLOR = "#9B59B6"
    static readonly FOOTER = 'Chief of Operations, at your service!'
    static readonly DM = "DM"
    static readonly GAME_DETAILS = "Game Details"
    static readonly APPLICATION = "Application"
    static readonly THREAD = "Got Questions?"
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