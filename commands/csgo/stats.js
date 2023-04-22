const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { TRN } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('Replies with Pong!')
    .addStringOption((option) =>
      option
        .setName('steamid')
        .setDescription('The player steam id')
        .setRequired(true)
    ),
  async execute(interaction) {
    const steamId = interaction.options.getString('steamid', true);

    try {
      let search = await fetch(
        `https://public-api.tracker.gg/v2/csgo/standard/search?platform=steam&query=${encodeURIComponent(
          steamId
        )}`,
        {
          method: 'GET',
          headers: {
            'TRN-Api-Key': TRN,
            Accept: 'application/json',
          },
        }
      );

      search = await search.json();

      console.log(search);

      if (search.data.lengh === 0) return interaction.reply('No user found!');

      let res = await fetch(
        `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${search.data[0].platformUserId}`,
        {
          method: 'GET',
          headers: {
            'TRN-Api-Key': TRN,
            Accept: 'application/json',
          },
        }
      );

      let result = await res.json();

      console.log(result.data.segments);

      if (result.errors !== undefined)
        return interaction.reply(result.errors[0].message);

      let username = result.data.platformInfo.platformUserHandle;
      let compHours = result.data.segments[0].stats.timePlayed.displayValue;
      let kd = result.data.segments[0].stats.kd.displayValue;
      let kills = result.data.segments[0].stats.kills.displayValue;
      let deaths = result.data.segments[0].stats.deaths.displayValue;
      let shotsAccuracy =
        result.data.segments[0].stats.shotsAccuracy.displayValue;
      let wins = result.data.segments[0].stats.wins.displayValue;
      let matchesPlayed =
        result.data.segments[0].stats.matchesPlayed.displayValue;

      let avatar = result.data.platformInfo.avatarUrl;

      let embed = new EmbedBuilder()
        .addFields(
          {
            name: 'Competitive Hours',
            value: compHours,
          },
          {
            name: 'K/D',
            value: kd,
            inline: true,
          },
          {
            name: 'Kills',
            value: kills,
            inline: true,
          },
          {
            name: 'Deaths',
            value: deaths,
            inline: true,
          },
          {
            name: 'Shots Accuracy',
            value: shotsAccuracy,
          },
          {
            name: 'Matches Played',
            value: matchesPlayed,
            inline: true,
          },
          {
            name: 'Wins',
            value: wins,
            inline: true,
          }
        )
        .setTitle(username)
        .setThumbnail(avatar);

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      await interaction.reply('An error has occurred!');
    }
  },
};
