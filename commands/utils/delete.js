const { SlashCommandBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Sends a message and then deletes it."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply("ola");
    const message = await interaction.fetchReply();
    console.log(message);
    await wait(4000);
    await interaction.deleteReply();
  },
};
