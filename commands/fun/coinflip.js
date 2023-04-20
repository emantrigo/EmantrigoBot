const { SlashCommandBuilder } = require("discord.js");

const prisma = require("../../db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Play coinflip!")
    .addStringOption((option) =>
      option
        .setName("side")
        .setDescription("The side you want to bet on.")
        .setRequired(true)
        .addChoices(
          {
            name: "Heads",
            value: "heads",
          },
          {
            name: "Tails",
            value: "tails",
          }
        )
    )
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount you want to bet.")
        .setRequired(true)
    ),
  async execute(interaction) {
    let array = ["heads", "tails"];

    let random = Math.floor(Math.random() * array.length);
    let result = array[random];

    const user = await prisma.user.findUnique({
      where: {
        id: interaction.user.id,
      },
    });

    const amount = interaction.options.getInteger("amount", true);

    if (user.points < amount) {
      return interaction.reply({
        content: "You don't have enough money to bet that much!",
        ephemeral: true,
      });
    }

    const side = interaction.options.getString("side", true);

    if (side === result) {
      await prisma.user.update({
        where: {
          id: interaction.user.id,
        },
        data: {
          points: user.points + amount,
        },
      });
      const message = await interaction.reply({
        content: "It was " + result + "! You won!",
        fetchReply: true,
      });

      message.react("🎉");
    } else {
      await prisma.user.update({
        where: {
          id: interaction.user.id,
        },
        data: {
          points: user.points - amount,
        },
      });
      const message = await interaction.reply({
        content: "It was " + result + "! You Lost!",
        fetchReply: true,
      });
      message.react("😭");
    }
  },
};
