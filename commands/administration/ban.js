const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user from the server")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to kick")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);
      if (member) {
        member
          .ban("Optional reason that will display in the audit logs")
          .then(() => {
            // We let the message author know we were able to kick the person
            interaction.reply(`Successfully banned ${user.tag}`);
          })
          .catch((err) => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            interaction.reply("I was unable to banned the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        await interaction.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      await interaction.reply("You didn't mention the user to ban!");
    }
  },
};
