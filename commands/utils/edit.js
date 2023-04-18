const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("edit")
    .setDescription("Sends a message and then edits it."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply("This message will be edited.");
    await wait(2000);
    await interaction.editReply("This message has been edited.");
  },
};
