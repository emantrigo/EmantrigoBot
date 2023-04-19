const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("teamselect")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const message = await interaction.reply({
      content: "React with 🅰️ or 🅱️ ",
      fetchReply: true,
    });

    message.react("🅰️");
    message.react("🅱️");

    const filter = (reaction, user) => {
      return (
        (reaction.emoji.name === "🅰️" || reaction.emoji.name === "🅱️") &&
        user.id !== message.author.id
      );
    };

    let usersA = [];
    let usersB = [];

    const collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === "🅰️") usersA.push(user);
      if (reaction.emoji.name === "🅱️") usersB.push(user);

      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", async (collected) => {
      console.log(`Collected ${collected.size} items\m`);

      await interaction.editReply({
        content: `Team A ${usersA.map((user) => user)} \n Team B ${usersB.map(
          (user) => user
        )}`,
      });
    });
  },
};
