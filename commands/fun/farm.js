const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ComponentType,
} = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("farm")
    .setDescription("Farm Bot Clone"),
  async execute(interaction) {
    const farm = new ButtonBuilder()
      .setCustomId("farm")
      .setLabel("Farm")
      .setStyle(ButtonStyle.Primary);

    const sell = new ButtonBuilder()
      .setCustomId("sell")
      .setLabel("Sell")
      .setStyle(ButtonStyle.Primary);

    const back = new ButtonBuilder()
      .setCustomId("back")
      .setLabel("Go Back")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(farm, sell, back);

    const response = await interaction.reply({
      content: "You are now farming!",
      components: [row],
      fetchReply: true,
    });

    const collector = response.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 3_600_000,
      componentType: ComponentType.Button,
    });

    let n = 0;

    collector.on("collect", async (i) => {
      n++;
      await i.update({
        content: `You are now farming!  ${n}`,
        components: [row],
        fetchReply: true,
      });
    });
  },
};
