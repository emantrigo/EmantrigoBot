const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("action")
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
      components: [row],
    });

    const filter = (i) => i.user.id === interaction.user.id;
    try {
      const confirmation = await response.awaitMessageComponent({
        filter,
        time: 3000,
      });

      if (confirmation.customId === "confirm") {
        await confirmation.update({ content: "confirmed", components: [] });
      } else if (confirmation.customId === "cancel") {
        await confirmation.update({ content: "canceled" });
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};
