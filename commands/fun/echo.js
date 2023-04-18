const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("echo")
    .setDescription("Replies with echo!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("ephemeral")
        .setDescription("Should the message be ephemeral")
    ),

  async execute(interaction) {
    const input = interaction.options.getString("input");
    const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;

    await interaction.reply({
      content: `Echoing \`${input}\` to ${interaction.user}`,
      ephemeral: ephemeral,
    });
  },
};
