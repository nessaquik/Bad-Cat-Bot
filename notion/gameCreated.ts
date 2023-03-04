import { Client } from "@notionhq/client"
import { Game } from "./dbConstants"

export async function AddGameToNotion(threadId: string,
    title: string,
    dm: string,
    gameFormat: string) {
    const notion = new Client({ auth: process.env.NOTIONTOKEN })
    const databaseId = Game.DB_ID
    try {
        await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                "Name": {
                    title: [
                        {
                            "text": {
                                "content": title
                            }
                        }
                    ]
                },
                "ID": {
                    rich_text: [
                        {
                            "text": {
                                "content": threadId
                            }
                        }
                    ]
                },
                "DM": {
                    rich_text: [
                        {
                            "text": {
                                "content": dm
                            }
                        }
                    ]
                },
                "Format": {
                    rich_text: [
                        {
                            "text": {
                                "content": gameFormat
                            }
                        }
                    ]
                }
            },
        })
        console.log("Notion Entry Added for new game")
    } catch (error) {
        console.error(error)
    }
}