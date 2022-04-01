const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.get("/", (req, res) => {
  res.send("hello noro")
})

app.use('/ping', (req, res) => {
  res.send(new Date());
});
const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const db = require("pro.db"); //Noro

// import setPrice from "./commands/setPrice"
let owner;
const updateAdmins = () => {
  owner = db.get("admins")
  owner.unshift('722450039942938664')// "386557421381877763"; //اي دي حقك
}
updateAdmins()
let sv = '953185847845478421'
let prefix = db.get("prefix") || "-"; ///برفكس
let embColor = "RED"
client.on("ready", () => {
  //Noro

  client.guilds.cache.forEach(g => {
    if (g.id !== sv) g.leave()
  })
  console.log(`Logged in as ${client.user.tag}!`);
  // Set the client user's presence
  let textList = ["with you" , `${prefix}help` , "with your commands"] 
client.user.setPresence({ activities: [{ name: `${prefix}help`}], status: 'online' })

  setInterval(() => {
  let text = textList[Math.floor(Math.random() * textList.length)]
    client.user.setPresence({ activities: [{ name: text}], status: 'online' })
  } , 30000)
})


const logToCh = ( channel , message , payload , account , verb) => {
  if (db.has(channel)) {
              ch = db.get(channel)
              client.channels.cache
                .get(ch)

                .send({
                  embeds: [new Discord.MessageEmbed()
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp()
                    .setDescription(`${message.author.tag} ${verb} ${account} :\n \`\`\`${payload.join("\n")}\`\`\``)
                    .setFooter(
                      `- `,
                      `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
                    )
                    .setColor(embColor)
                  ]
                })}
}


///https://discord.gg/re8hxeYAYz
///Noro
client.on('guildCreate', guild => {
  if (guild.id !== sv) return guild.leave()
})


client.on("message", async message => {

  //Noro

  let prefixx = "s";
  const args = message.content
    .slice(prefixx.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  if (message.content.startsWith(prefixx + "etprefix")) {
    if (!owner.includes(message.author.id)) return;
    if (!args[0])
      return message.channel.send(
        db.get("prefix") || `> **The Server Prefix is : \`${prefix}\``
      );
    db.set("prefix", args[0]);
    message.channel.send(
      `> **Done Setting the new Prefix To : \`${db.get("prefix")}\``
    );
  }
});

///https://discord.gg/re8hxeYAYz
///https://discord.gg/re8hxeYAYz
///Noro
///Noro

let cooldown = false;
client.on("message", async message => {
  try {
    if (db.get("blacklist").includes(message.author.id)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const command = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix) || message.author.bot) return; //Noro

    if (command === "status") {
      if (!owner.includes(message.author.id)) return; //Noro
      if (!args[0]) return message.channel.send({
        embeds: [
          new Discord.MessageEmbed() //Noro
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .addField(
              `> Error :`,
              `Usage : ${prefix}status \`TYPE\`\n\n \`\`\`TYPE = [ open : to open the shop \n close : to close the shop ]\`\`\``
            )
            .setFooter(
              `- `,
              `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
            )
            .setColor(embColor)
            .setTimestamp()
            .setTitle("Status Command")
            .setColor(embColor)]
      }
      );
      if (args[0] === "open") {
        message.channel.send("> ** Store opened successfully ✅**");
        db.set("status", args[0]);
      }
      if (args[0] === "close") {
        db.delete("status");
        message.channel.send("> ** Store closed successfully ✅**");
      }
    }
    ///https://discord.gg/re8hxeYAYz
    ///https://discord.gg/re8hxeYAYz
    ///Noro
    ///Noro

    if (command.startsWith("setprice-")) {

      const account = command.split("-")[1]

      if (!owner.includes(message.author.id)) return message.channel.send("You don't have permission ❌");
      if (message.channel.type === "dm") return;
      let tax = Math.floor(args[0] * (20 / 19) + 1);
      if (!tax)
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //Noro
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addField(
                `> Error :`,
                `Usage : ${prefix}setprice-${account} \`PRICE\`\n\n \`\`\`PRICE = [ Enter account price ]\`\`\``
              )
              .setFooter(
                `- `,
                `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Setprice ${account} Command`)]
        }
        ).setColor(embColor);

      let data = db.get("accounts")
      let thisAcc = data.find(el => el.name === account)

      if (!thisAcc) return message.channel.send("**There is no such account ❌**")
      data[data.indexOf(thisAcc)].price = Number(args[0])
      data[data.indexOf(thisAcc)].tax = tax

      db.set("accounts", data)





      return message.channel.send(`> ** The price of ${account} accounts has been successfully determined ✅**`);
    }
    ///https://discord.gg/re8hxeYAYz
    ///https://discord.gg/re8hxeYAYz
    ///Noro
    ///Noro

    if (command.startsWith("add-")) {

      const account = command.split("-")[1]
      //Noro
      if (!owner.includes(message.author.id)) return; //Noro
      if (!args[0])
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //Noro
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addField(
                `> Error :`,
                `Usage : ${prefix}add-${account} \`ACCOUNT\`\n\n \`\`\`ACCOUNT = [ EMAIL:PASSWORD ]\`\`\``
              )
              .setFooter(
                `- `,
                `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Add ${account} Accounts Command`)]
        }
        );
      if (!message.content.includes(":"))
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //Noro
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addField(
                `> Error :`,
                `Usage : ${prefix}add-${account} \`ACCOUNT\`\n\n \`\`\`ACCOUNT = [ EMAIL:PASSWORD ]\`\`\``
              )
              .setFooter(
                `- `,
                `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Add ${account} Accounts Command`)]
        }
        );
      //Noro
      let Data = db.get("accounts")
      let thisAcc = Data.find(el => el.name === account)

      if (!thisAcc) {
        let m = message.content.split(" ").slice(1).join(" ").split("\n")
        Data.push({ name: account, price: 0, tax: 0, emails: m })
        db.set("accounts", Data)
        message.delete()
        return message.channel.send(`> ** The ${account} account has been added successfully ✅**`);
      }
      else {
        let m = message.content.split(" ").slice(1).join(" ").split("\n")

        currentData = Data[Data.indexOf(thisAcc)].emails
        Data[Data.indexOf(thisAcc)].emails = [...currentData, ...m]
        db.set("accounts", Data)
        logToCh("add" , message , m ,account , "added" )
        message.delete()
        return message.channel.send(`> **The ${account} account has been added successfully ✅**`);
      }

    }

    ///https://discord.gg/re8hxeYAYz
    ///https://discord.gg/re8hxeYAYz
    ///Noro
    ///Noro

    if (command.startsWith("delete-")) {
      const account = command.split("-")[1]
      if (!owner.includes(message.author.id)) return;
      let data = db.get("accounts")

      let newData = data.filter(el => el.name !== account)

      db.set("accounts", newData);
      message.channel.send(`> ** ${account} category has been deleted successfully ✅**`);
    }

    ///https://discord.gg/re8hxeYAYz
    ///https://discord.gg/re8hxeYAYz
    ///Noro
    ///Noro

    if (command.startsWith("give-")) {
      if (!owner.includes(message.author.id)) return message.channel.send("**only admins can use give gommand**")
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.find(u => u.id === args[0]);

      const numOfAcc = args[1] || 1
      const account = command.split("-")[1]
      const data = db.get("accounts")
      let accInDb = data.find(el => el.name === account)
      if (!accInDb) { return message.channel.send("**This item does not exist ❌**") }
      if (!user)
        return message.channel.send("> **Please select the user correctly **");
      if (accInDb.emails.length < numOfAcc) { return message.channel.send("**Not enough accounts in stock, please check the bot at a later time**") }

      const sentMail = accInDb.emails.splice(0, numOfAcc)
      logAcc = sentMail;
      data[data.indexOf(accInDb)].emails = accInDb.emails;
      db.set("accounts", data)
      user.send({
        embeds: [new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setTitle(`**Hi ${user.username} , ${client.user.username} gave you ${numOfAcc} ${account} account${numOfAcc > 1 ? "s" : ""}:**`)
          .setDescription(
            `
          **Your account${numOfAcc > 1 ? "s" : ""}:**
\`\`\`${sentMail.join("\n")}\`\`\`
`)
          .setFooter(
            `- `,
            `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
          )
          .setColor(embColor)
        ]
      })
      message.channel.send(`<@${user.id}> **Check your Dm's ✅**`)

      if (db.has("ch")) {
        ch = db.get("ch")
        client.channels.cache
          .get(ch)
          .send({
            embeds: [new Discord.MessageEmbed().setTitle(`${message.author.tag} gave ${numOfAcc} ${account} account to ${user.username}`)
              .setDescription(`\`\`\`${logAcc.join("\n")}\`\`\``)
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
              .setFooter(
                `- `,
                `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
              )
              .setColor(embColor)

            ]
          });
      }

    }

    if (command === "buy") {
      const buyId = db.get("buy")
      if (![message.channel.id, "all"].includes(buyId)) {
        message.reply("**This is not the right room to buy ❌**");
        return;
      }
      if (cooldown === true) return message.reply("**Wait 1 minute before buy again** " + "<@" + message.author.id + ">");
      const account = args[0], numOfAcc = args[1] || 1
      //Noro
      const data = db.get("accounts")
      let accInDb = data.find(el => el.name === account)
      if (!accInDb) { return message.channel.send("**This item does not exist ❌**") }
      let { price, tax, emails } = accInDb;
      let probotid = db.get("probot") || "282859044593598464";
      let role = db.get("role");
      if (message.channel.type === "dm") return;
      if (!db.has("status")) return message.channel.send("The store is closed.");

      if (emails.length < numOfAcc) { return message.channel.send("**Not enough accounts in stock, please check the bot at a later time**") }
      let logAcc;
      let buys = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .addField(`**Purchasing ${account} account :**`
          ,
          `
            
            > **-Number of accounts :** \`${numOfAcc}\`
            > **-Total price :** \`${tax * numOfAcc}\`  
            > **You have 50 seconds to transfer**
            > **Please make sure you have an open dm** ⚠️

            **To buy please type this :**
          \`\`\`
#credit <@${owner[0]}> ${numOfAcc * tax}
او #credit منشن PoUUU#0001  ${numOfAcc * tax}
           \`\`\`
            
     
            
`   )

        .setFooter(
          `- `,
          `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
        )
        .setColor(embColor);
      message.channel.send({ embeds: [buys] }).then(msg => {


        const filter = ({ content, author: { id } }) => {

          return content.startsWith(
            `**:moneybag: | ${message.author.username}, has transferred `
          ) &&
            content.includes(`${owner[0]}`) &&
            id === probotid &&
            (Number(content.slice(content.lastIndexOf("`") - String(tax * numOfAcc).length, content.lastIndexOf("`"))) >= price * numOfAcc)
        }


        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 50_000,
          errors: ['time']
        }).then(msg => {
          const sentMail = emails.splice(0, numOfAcc)
          logAcc = sentMail;
          data[data.indexOf(accInDb)].emails = emails;
          db.set("accounts", data)

          message.author.send({
            embeds: [new Discord.MessageEmbed()
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .setTimestamp()
              .setDescription(`**Hi ${message.author.tag} , you have purchased ${numOfAcc} ${account} account${numOfAcc > 1 ? "s" :""}:**
> **Total price : \`${tax * numOfAcc}\`**
          **Your account${numOfAcc > 1 ? "s":""}:**

         \`\`\` ${sentMail.join("\n")}\`\`\`
`)
              .setFooter(
                `- `,
                `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
              )
              .setColor(embColor)
            ]
          })
          message.reply("**Check your Dm's ✅**")
          msg.delete()

        })

          .then(() => {
            cooldown = false
            if (db.has("ch")) {
              ch = db.get("ch")
              if (ch){
              client.channels.cache
                .get(ch)

                .send({
                  embeds: [new Discord.MessageEmbed()
                    .setAuthor(
                      message.author.username,
                      message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTimestamp()
                    .setDescription(`${message.author.tag} bought ${account} :\n \`\`\`${logAcc.join("\n")}\`\`\``)
                    .setFooter(
                      `- `,
                      `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
                    )
                    .setColor(embColor)
                  ]
                })
              //   .send(`${message.author.tag} bought a ${account} account \n Account Informations : \`\`\`${logAcc.join("\n")}\`\`\``);
            }
            }
          })

          .catch(err => {
            cooldown = false
            console.log(err)
            msg.delete()
            message.reply("**العمليه انتهت ! , operation finished ❌ **")
          })

      })


      !cooldown && (cooldown = true)

    cooldown &&  setTimeout(() => {
        // Removes the user from the set after a minute
        cooldown = false


      }, 100);
      return
    }
    if (command === "setlog") {
      if (message.channel.type === "dm") return;
      if (!owner.includes(message.author.id))
        return;
      let ch =
        message.guild.channels.cache.find(ch =>
          ch.name.toLocaleLowerCase().includes(args[0])
        ) || message.guild.channels.cache.find(ch => ch.id === args[0]);
      if (!ch) return message.channel.send("> **Please select the room correctly **");
      db.set("ch", ch.id);
      message.channel.send("> ** The log room has been selected successfully ✅**");
    }
    if (command === "reslog") {
      if (message.channel.type === "dm") return;
      if (!owner.includes(message.author.id))
        return;
      let ch =
        message.guild.channels.cache.find(ch =>
          ch.name.toLocaleLowerCase().includes(args[0])
        ) || message.guild.channels.cache.find(ch => ch.id === args[0]);
      if (!ch) return message.channel.send("> **Please select the room correctly **");
      db.set("add", ch.id);
      message.channel.send("> ** The add log room has been selected successfully ✅**");
    }
    if (command === "user-add") {
      if (message.channel.type === "dm") return;
      if (owner[0] != message.author.id) return;
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.find(u => u.id === args[0]);

      if (!user)
        return message.channel.send("> **Please select the user correctly **");
      db.push("admins", user.id);
      updateAdmins()
      message.channel.send(`> **${user.tag} Added as an admin ✅**`);
    }
    if (command === "ping") {
      message.channel.send(
        `🏓Latency is ${Date.now() -
        message.createdTimestamp}ms. API Latency is ${Math.round(
          client.ws.ping
        )}ms`
      );
    }
    if (command === "user-remove") {
      if (message.channel.type === "dm") return;
      if (owner[0] != message.author.id) return;
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.find(u => u.id === args[0]);

      if (!user)
        return message.channel.send("> **Please select the user correctly **");
      const filtered = db.get("admins").filter(ad => ad != user.id)
      db.set("admins", filtered);
      updateAdmins()
      message.channel.send(
        `> ** ${user.tag} has been removed from the admin list ✅**`
      );
    }
    if (command === "setprobot") {
      if (!owner.includes(message.author.id)) return;
      if (message.channel.type === "dm") return;
      if (!args[0])
        return message.channel.send("> **Please select the ID Probot correctly **");
      db.set("probot", args[0]);
      message.channel.send("> **✅ Probot has been successfully identified!**");
    }
    if (command === "setcustomerrole") {
      let custommer =
        message.guild.roles.cache.find(r =>
          r.name.toLocaleLowerCase().includes(args[0])
        ) || message.guild.roles.cache.find(r => r.id === args[0]);
      if (!custommer)
        return message.channel.send("> **Please select the customer roll correctly **");
      db.set("role", custommer.id);
      message.channel.send("> ** Customer roll selected successfully ✅**");
    }
    if (command === "stock") {
      if (message.channel.type === "dm") return;

      const accounts = db.get("accounts")


      let embed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username,
          message.author.displayAvatarURL({ dynamic: true })
        ).setFooter(
          `- `,
          `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
        )
        .setTimestamp().setColor(embColor);

      for (let { name, price, tax, emails } of accounts) {
        embed.addField(
          `${name}`,
          `
            > **Price :** ${price}
            > **Stock :** ${emails.length}
            > **To buy:** \`${prefix}buy ${name} \` 
            `
        )
      }

      message.channel.send({ embeds: [embed] }
      );
    }
    if (command === "setbuy") {
      if (message.channel.type === "dm") return;
      if (!owner.includes(message.author.id))
        return;
      let ch =
        message.guild.channels.cache.find(ch =>
          ch.name.toLocaleLowerCase().includes(args[0])
        ) ?.id || message.guild.channels.cache.find(ch => ch.id === args[0]) ?.id;
      args[0] === "all" && (ch = "all")
      if (!ch) return message.channel.send("> **Please select the room correctly **");
      db.set("buy", ch);
      message.channel.send("> ** The buy room has been selected successfully ✅**");

    }
    if (command.startsWith("remove-")) {
      const acc = command.split("-")[1]
      //Noro
      if (!owner.includes(message.author.id))
        return;
      if (message.channel.type === "dm") return;
      if (!args[0])
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed() //Noro
              .setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
              )
              .addField(
                `> Error :`,
                `Usage : ${prefix}remove-${acc} \`ACCOUNT\`\n\n \`\`\`ACCOUNT = [ EMAIL:PASSWORD ]\`\`\``
              )
              .setFooter(
                `- `,
                `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
              )
              .setColor(embColor)
              .setTimestamp()
              .setTitle(`Remove ${acc} Account Command`)]
        }
        ); //Noro
      const data = db.get("accounts"); //Noro
      const account = data.find(el => el.name === acc)
      if (!account)
        return message.channel.send(`> **:x: There are no accounts in the stock! **`); //Noro
      if (args[0] === "all") {
        data[data.indexOf(account)].emails.length = 0
        db.set("accounts", data)

        return message.channel.send(`> **All ${acc} accounts has been removed successfully ✅**`);

      }
      else if (!message.content.includes(":"))
        return message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setColor(embColor)
              .setDescription(`> usage : ${prefix}remove${acc} [adress:email]`)]
        }
        ); //Noro
      const filtered = account.emails.filter(accs => accs !== args[0]);
      data[data.indexOf(account)].emails = filtered //Noro
      db.set("accounts", data)
      message.channel.send(`> **account \`${args[0]}\`  has been removed successfully ✅**`);
    } //Noro
    if (command.startsWith("display-")) {
      const account = command.split("-")[1]
      //Noro
      if (message.channel.type === "dm") return; //Noro
      if (!owner.includes(message.author.id)) return; //Noro
      const accounts = db.get("accounts") ?.find(el => el ?.name === account) ?.emails;
      const text =
        accounts && accounts[0]
          ? accounts.join("\n")
          : ` There are no ${account} accounts in your stock ❌`; //Noro
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setAuthor(
              message.author.username,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setTitle(`All ${account} accounts :`)
            .setDescription(`\`\`\`${text}\`\`\``)
            .setFooter(
              `- `,
              `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
            )
            .setTimestamp().setColor(embColor)
        ]
      }
      );
    }
    if (command.startsWith("setcolor")) {
      if (!owner.includes(message.author.id)) return message.channel.send("**you are not an admin**")
      embColor = args[0].toUpperCase();
      message.channel.send(`**all embeds color was set to ${args[0].toUpperCase()}**`)
    }

    if (command === "restart") {
      if (!owner.includes(message.author.id)) return; //Noro
      message.channel
        .send(`Restart is in progress...`)
        .then(() => client.destroy())
        .then(() => {
          client.login(process.env.token);
          message.channel.send("> ** The bot has been successfully restarted ✅**");
        });
    }
    if (command === "help") {
      if (message.channel.type === "dm") return; //Noro
      const embed =
        new Discord.MessageEmbed()
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTitle(`About ${client.user.username}`)
          .addField(`General`, `\`stock => to see availabe stuff\`\n\`buy [type] [number] => to buy anything\`\n\`ping => to see the latency\` `)
          .setDescription(
            `Developer : <@386557421381877763>`
          )

          .setFooter(
            `- `,
            `https://cdn.discordapp.com/icons/744592615592296539/9611fcdda6f1f6cd5470dbc02ba0af64.png?size=1024`
          ).setColor(embColor)
      if (owner.includes(message.author.id)) {
        embed.addField(
          `Administrator`,


          `\n\n**👤 User**\n\n\`user-add [user] => add an administrator\`\n\`user-remove [user] => remove an administrator\`\n\`blacklist [user] => add someone to blacklist\`\n\`unblacklist => remove someone from blacklist\`\n\`resetblacklist => clear blacklist\`\n
\**🛒 Shop\**\n
\`add-[type] [account] => add a new account\`\n\`remove-[type] [account] => remove a specific account\`\n\`remove-[type] => remove all accounts\`\n\`setprice-[type] => change price\`\n\`delete-[type] => delete a full type\`\n\`give-[type] [user] [number] => for replacement\`\n\`setbuy [all] or [channel_id] => select buy channel\`\n
**🛠️ Settings**\n
\`display-[type] => display all accounts\`\n\`setlog => set a log room\`\n\`status [open] or [close]\`\n\`setcolor [color] => to change embeds color\``
        )

      }
      message.channel.send({ embeds: [embed] });
    }
  }
  catch (err) {
    console.log(err.message)
  }
});

///https://discord.gg/re8hxeYAYz
///https://discord.gg/re8hxeYAYz
///Noro
///Noro

client.on("message", async message => {
  try {
    if (db.get("blacklist").includes(message.author.id)) return;
    let prefix = await db.get("prefix");
    if (message.content.startsWith(prefix + "setname")) {
      let args = message.content.split(" ");
      let botnameee = args.slice(1).join(" ");
      if (!owner.includes(message.author.id))
        return message.channel.send(`** ❌ Only Owners Can Use this Command **`);
      if (!botnameee)
        return message.channel.send(
          `** ❌ Please Provide me a name for the bot !**`
        );
      client.user.setUsername(`${botnameee}`);
      message.channel.send(`Changing The bot's Name ...`).then(me => {
        me.edit(` Done !`);
      });
    }
    if (message.content.startsWith(prefix + "setavatar")) {
      let args = message.content.split(" ");
      let botnameee = args.slice(1).join(" ");
      if (!owner.includes(message.author.id))
        return message.channel.send(`** ❌ Only Owners Can Use this Command **`);
      if (!botnameee)
        return message.channel.send(
          `** ❌ Please Provide me an avatar for the bot !**`
        );
      client.user.setAvatar(`${botnameee}`);
      message.channel.send(`Changing The bot's Avatar ...`).then(me => {
        me.edit(` Done !`);
      });
    }
  }
  catch (err) {
    console.log(err.message)

  }
});
///https://discord.gg/re8hxeYAYz
///https://discord.gg/re8hxeYAYz
///Noro
///Noro

client.on("message", async message => {
  try {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();
    let user =
      message.mentions.members.first() ||
      client.users.cache.find(u => u.id === args[0]);
    let blacklist = db.get("blacklist")
    if (message.channel.type === "dm") return;
    if (!db.get("admins").includes(message.author.id)) return;
    if (command === "blacklist") {

      if (!user)
        return message.channel.send("> **Please select the user correctly**");
      if (blacklist.includes(user.id))
        return message.channel.send("> **:x: The user is already in the list!**");
      db.push("blacklist", user.id)
      message.channel.send("> **The user has been added to the blacklist ✅**");
    }
    if (command === "unblacklist") {

      if (!user)
        return message.channel.send("> **Please select the user correctly**");
      if (!blacklist.includes(user.id))
        return message.channel.send("> **:x: The member is not in the list!**");
      const filtered = db.get("blacklist").filter(u => u != user.id)
      db.set("blacklist", filtered);
      message.channel.send("> **The user has been removed from the blacklist ✅**");
    }
    if (command === "resetblacklist") {

      db.set("blacklist", []);
      message.channel.send(
        "> ** All members have been removed from the blacklist ✅**"
      );
    }
  }
  catch (err) {
    console.log(err)
  }
});

///https://discord.gg/re8hxeYAYz
///https://discord.gg/re8hxeYAYz
///Noro
///Noro


client.login(process.env.token); ///التوكن تنحط في ملف .env