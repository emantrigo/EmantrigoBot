const { SlashCommandBuilder } = require("discord.js");

const prisma = require("../../db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const createdUser = await prisma.user.create({
      data: {
        id: interaction.user.id,
        username: interaction.user.username,
      },
    });

    await interaction.reply(
      "Created user with id: " +
        createdUser.id +
        " and username: " +
        createdUser.username
    );
  },
};
