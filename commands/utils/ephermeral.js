const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ephemeral")
    .setDescription("Sends an ephemeral reply to the user."),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply({
      content: "secret ephemeral message",
      ephemeral: true,
    });
  },
};
