const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deferred")
    .setDescription("Sends deferred message and then edits it."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.deferReply();
    await wait(4000);
    await interaction.editReply("Ja esta!!!");
  },
};
