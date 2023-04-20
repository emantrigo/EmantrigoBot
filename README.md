# Discord Bot Made by Emantrigo

# How To Run

1. Install dependencies

   ```bash
    npm install
   ```

2. Create a config.json file

   ```json
   {
     "token": "xxxxxxxxxxxxxxx",
     "clientId": "xxxxxxxxxxxxxxx",
     "guildId": "xxxxxxxxxxxxxxx"
   }
   ```

3. Deploy all the commands to discord

   ```bash
   node deploy-commands.js
   ```

4. Run the Bot
   ```
   npm run start
   ```

# Available Commands

## Fun

```
Echo - Echoes a message back
Ping - Replies with Pong!
TeamSelect - Use the emojis to select a team
Farm - Starts a farming trip
Random - Selects a random number between X and Y
Impersonate - Impersonates another user
```

## Utils

```
Server - Provides information about the server
User - Provides information about the user
Ephemeral - Send an ephemeral message
Followup - Replies with a message and then a followup
```

## Administration

```
Kick - Kicks a user from the server.
Ban - Bans a user from the server.
```
