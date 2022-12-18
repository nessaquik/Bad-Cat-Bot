# Formulate

Hello and Welcome! This is my first attempt at making a discord bot. The aim was mostly to learn, but also to deliver a specific experience for a particular server. It was a fantastic adventure and made me learn so much about hosting.

## Getting Started

If it's your first time coding a discord bot, I can't recommend [this youtube series](https://www.youtube.com/playlist?list=PLaxxQQak6D_f4Z5DtQo0b1McgjLVHmE8Q) highly enough!
The [DiscordJS documentation](https://discordjs.guide/#before-you-begin) has been a lifesafer as well.

This presumes you know a teeny bit about typescript and npm (which frankly, I don't, but anyway)
The code is surprisingly easy to edit and test, so you shouldn't need much.
Feel free to use this as a base to make your own bots (or learn to, please don't consider this code to be any sort of standard, it sucks!)

## Understood, I'd still like to do it

EXCELLENT! You're my kind of crazy
First things first, you're going to need your own discord bot

### Make a Bot

1. Go to the [Discord Developer Dashboard](https://discord.com/developers/applications) and create a new Application
2. Click on Bot then **Add Bot**
3. There is a **Reset Token** button underneath. Use that to get your token AND DO NOT SHARE IT WITH ANYONE. Copy it and keep it with you for now
4. I'd recommend keeping the bot private if you are testing
5. Then, in the OAuth2, select `applications.command` and `bot`. In bot permissions, I recommend scoping down permissions to what you need, but for now, you can go with `Administrator`
6. Use the generated URL to invite the Bot to your Test Server

You can also follow [this set of instructions](https://discord.com/developers/docs/getting-started) till *Installing your app* if you are having trouble.
DO NOT follow **Handle Interactivity**, it is not required with DiscordJS that we are using!

CONGRATULATIONS! You've made a Discord Bot. Now the hard part

### Make it do something

#### Preparing your machine

1. [Download NodeJS](https://nodejs.org/en/download/)
2. [Get VSCode](https://code.visualstudio.com/Download) - No Microsoft did not pay me, it's just that good
3. Install [Git](https://git-scm.com/download/win)

#### Using this code

1. Clone the repo into your local machine
2. Create a local .env file, copy values over from .env.sample and add your token obtained from the bot.
3. To test in a local server, get the ID of that server and add it to GuildId. (You can do this by enabling developer mode and right clicking the server to Copy Id)
4. Run the following in the repo
   1. `npm install` to install all dependencies
   2. Run `npm start` to start the app

That's it. So long as `npm start` is running, your app is up
You can test it in your test server

#### Testing this code

1. You can run `/ping` in your test server and see if it replies with PONG. If it does, the bot is working
2. You can now edit the code and start the app again to see the changes in your test server
3. To make developement easier, you can run `npm run dev` that automatically refreshes the app when you make a change and save the file
4. If you would like to debug, just go to VSCode Debug and debug *Example*

### Host the bot

Haven't figured this one out yet. Testing a few options. Will update when I find it.
For now, I've been using my Raspberry Pi

HAPPY CODING!
