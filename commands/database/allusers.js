const { SlashCommandBuilder } = require("discord.js");

const prisma = require("../../db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("allusers")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const allUsers = await prisma.user.findMany();

    await interaction.reply("All users: " + allUsers.map((u) => u.username));
  },
};
