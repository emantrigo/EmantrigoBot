const { SlashCommandBuilder } = require("discord.js");

const insults = require("../../insults.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insult")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const userId = interaction.user.id;

    const userInsults = insults[userId];

    if (!userInsults) {
      await interaction.reply("You have no insults!");
    } else {
      const randomInsult =
        userInsults[Math.floor(Math.random() * userInsults.length)];
      await interaction.reply(randomInsult);
    }
  },
};
