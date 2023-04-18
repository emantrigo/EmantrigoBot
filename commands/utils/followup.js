const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("followup")
    .setDescription("Send a message and then a followup"),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply("Pong !");
    await interaction.followUp("Ping !");
  },
};
