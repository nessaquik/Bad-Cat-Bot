import { Client } from "@notionhq/client"
import { AppSent } from "./dbConstants"
import { FindGameEntryById } from "./notionFunctions"

export async function AddAppCreatedToNotion(user: string,
    gameId: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = AppSent.DB_ID
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
        console.log("Notion Entry Added for new application created")
    } catch (error) {
        console.error(error)
    }
}