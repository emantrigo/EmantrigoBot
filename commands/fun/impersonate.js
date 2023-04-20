const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("impersonate")
    .setDescription("Impersonates Another User")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to impersonate")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const user = options.getUser("user");
    const message = options.getString("message");

    await interaction.channel
      .createWebhook({
        name: user.username,
        avatar: user.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send({ content: message });
        setTimeout(() => webhook.delete(), 3000);
      });

    await interaction.reply({
      content: `Impersonated ${user.username}`,
      ephemeral: true,
    });
  },
};
