const { SlashCommandBuilder, EmbedBuilder, User } = require("discord.js");

module.exports = {
  cooldown: 5,
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    //console.log(interaction.guild);

    const owner = await interaction.client.users.fetch(
      interaction.guild.ownerId
    );
    const embed = new EmbedBuilder()
      .setTitle(interaction.guild.name)
      .addFields({
        name: "Owner",
        value: owner.username,
      })
      .setImage(owner.avatarURL({ size: 64 }))
      .setDescription("This is an embed")
      .setAuthor({
        name: "Some name",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
        url: "https://discord.js.org",
      })
      .setColor(0x0099ff)
      .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      })
      .addFields(
        {
          name: "Member Count",
          value: `${interaction.guild.memberCount}/${interaction.guild.maximumMembers}`,
        },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      });

    await interaction.reply({ embeds: [embed] });
  },
};
