const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const message = await interaction.reply({
      content: "React with 👍",
      fetchReply: true,
    });

    message.react("👍");

    const filter = (reaction, user) => {
      return reaction.emoji.name === "👍";
    };

    const collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on("collect", (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    });

    collector.on("end", (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};
