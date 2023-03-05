import { Client } from "@notionhq/client"
import { AppStarted } from "./dbConstants"
import { FindGameEntryById } from "./notionFunctions"

export async function AddAppStartedToNotion(user: string,
    gameId: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = AppStarted.DB_ID
    try {
        var gameEntryId = await FindGameEntryById(gameId)
        if (gameEntryId != null && gameEntryId.length!=0){
            await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    "Name": {
                        title: [
                            {
                                "text": {
                                    "content": user
                                }
                            }
                        ]
                    },
                    "Games": {
                        relation: [
                            {
                                "id": gameEntryId
                            }
                        ]
                    },
                    "GameID": {
                        rich_text: [
                            {
                                "text": {
                                    "content": gameId
                                }
                            }
                        ]
                    }
                },
            })
        }
        else{
            await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    "Name": {
                        title: [
                            {
                                "text": {
                                    "content": user
                                }
                            }
                        ]
                    },
                    "GameID": {
                        rich_text: [
                            {
                                "text": {
                                    "content": gameId
                                }
                            }
                        ]
                    }
                },
            })
        }
        console.log("Notion Entry Added for new application started")
    } catch (error) {
        console.error(error)
    }
}