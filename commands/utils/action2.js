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
    .setName("action2")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    const confirm = new ButtonBuilder()
      .setCustomId("confirm")
      .setLabel("Confirm")
      .setStyle(ButtonStyle.Success);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Danger);

    const select = new StringSelectMenuBuilder()
      .setCustomId("starter")
      .setPlaceholder("Select a starter")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Bulbasaur")
          .setValue("bulbasaur")
          .setDescription("The Grass Starter"),

        new StringSelectMenuOptionBuilder()
          .setLabel("Charmander")
          .setValue("charmander")
          .setDescription("The Fire Starter"),

        new StringSelectMenuOptionBuilder()
          .setLabel("Squirtle")
          .setValue("squirtle")
          .setDescription("The Water Starter")
      );

    const row = new ActionRowBuilder().addComponents(confirm, cancel);
    const row2 = new ActionRowBuilder().addComponents(select);

    const response = await interaction.reply({
      content: "Are you sure?",
      components: [row2],
    });

    const collector = response.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 3_600_000,
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", async (i) => {
      const selection = i.values[0];
      await i.reply(`${i.user} has selected ${selection}!`);
    });
  },
};
