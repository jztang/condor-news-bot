const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  console.log("condor-news-bot is now online");
});

client.on("messageReactionAdd", async (reaction) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      return;
    }
  }

  if (reaction.emoji.id == "791454531166797835" || reaction.emoji.id == "802308409906561075") {
    if (!reaction.message.reactions.cache.some((e) => e.emoji.name == "✅")) {
      reaction.message.react("✅");
      const news = `${reaction.message.author}'s post in ${reaction.message.channel} has been nominated for CoNDOR News: ${reaction.message.url}`;

      // tang
      client.users.fetch("125751489946714112").then((user) => {
        user.send(news);
      });

      // kupi
      client.users.fetch("451126989642924032").then((user) => {
        user.send(news);
      });

      // elad
      client.users.fetch("83595734733029376").then((user) => {
        user.send(news);
      });

      console.log(news);
    }
  }
});

client.login(token);
