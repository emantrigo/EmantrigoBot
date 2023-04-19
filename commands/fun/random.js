const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Select a random number between MIN and MAX")
    .addIntegerOption((option) =>
      option.setName("min").setDescription("The minimum number")
    )
    .addIntegerOption((option) =>
      option.setName("max").setDescription("The maximum number")
    ),

  async execute(interaction) {
    const min = interaction.options.getInteger("min") ?? 0;
    const max = interaction.options.getInteger("max") ?? 100;

    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    await interaction.reply(`Your random number is ${random}`);
  },
};
