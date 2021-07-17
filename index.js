const fetch 		     =     require('node-fetch'),
Discord     		     =     require("discord.js"),
{ toke, guild, chan, pa }    = 	   require("./config.json"),
	config               = 	   require("./config.json");

const client = new Discord.Client({
    disableMentions: 'everyone',
    messageCacheMaxSize: 50,
    messageCacheLifetime: 60,
    messageSweepInterval: 120,
    partials: [
        'MESSAGE',
        'USER',
        'GUILD_MEMBER',
        'REACTION',
        'CHANNEL'
    ],
    ws: {
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
        ],
    }
});

client.on('ready', () => {
    client.user.setActivity(config.status.name, { type: config.status.type.toUpperCase(), url: "https://twitch.tv/SmallCadaver" })
    console.log('Ready!');
});

client.on("message", async(message) =>{
if (message.author.bot || !message.guild) return;
if (message.guild.id !== guild) return;

const ch = message.guild.channels.cache.get(chan);
const code = message.content.match(/(?<=discord.gg\/)(.\S*)/g);
if (code){
if (pa.includes(message.channel.parentID)){
await fetch(`https://discord.com/api/invite/${code}`)
 .then((res) => res.json())
 .then(async (json) => {
  if (json.message === 'Unknown Invite') {
	await message.delete({ timeout: 1000 });
	const EMB = new Discord.MessageEmbed()
	.setTitle(`Auto Moderation For: `+ message.author.username+"#"+message.author.discriminator)
	.setColor("ORANGE")
	.setDescription(`Your ad has been removed from the channel:\n${message.channel}\n Reason being the following:\n`+json.message)
	ch.send(`${message.author}`, EMB)
	console.log("unknown!");
  } else {
	await message.channel.messages.fetch().then(m =>{
	m.forEach(msg=>{ if (msg.author.id === client.user.id){ msg.delete({ timeout: 1000 })
	}
	})
})
	const EMBED = new Discord.MessageEmbed()
	.setTitle(message.guild.name + ` | Advertising Information`)
	.setDescription(`\n:white_check_mark: Make sure your ad has a permanent invite.
:white_check_mark: Your server ad must include a description.
:white_check_mark: Make sure you are advertising in the correct channel.
:white_check_mark: Your server must follow the **[Discord ToS](https://discord.com/terms)**
:white_check_mark: No invite rewards or any servers that support raiding.
:x: Dm advertising will result in an immediate ban.
:x: Once you leave the server all your ads will get automatically deleted.
	`)
	.setColor("BLUE")
	.setFooter(`Need help/support? Open a ModMail thread by contacting @Light Support. Bot`)
	message.channel.send(EMBED);
  }
 });
}
}
	if(!code){
		if (pa.includes(message.channel.parentID)){
	await message.delete({ timeout: 1000 });
	const EMB = new Discord.MessageEmbed()
	.setTitle(`Auto Moderation For: `+ message.author.username+"#"+message.author.discriminator)
	.setColor("ORANGE")
	.setDescription(`Your ad has been removed from the channel:\n${message.channel}\n Reason being the following:\n`+"`No invite Provided in Description`")
	ch.send(`${message.author}`, EMB)
	console.log("unknown!");
		}
	}
})
client.on('guildMemberRemove', async (member) => {
let i = [];
config.catz.forEach(cat => {
if(member.guild.channels.cache.get(cat).id === cat){
member.guild.channels.cache.get(cat).children.forEach(child =>{
child.messages.fetch().then(messages => {
    messages.forEach(async(msg) =>{
if (msg.author.id === member.user.id){
await i.push[msg.id]
msg.delete({timeout: 1000 })
console.log(i.length);
}
})
})
  })
}
});
        const embed = new Discord.MessageEmbed()
            .setTitle(member.user.tag+ " Left")
            .setTimestamp()
            .setColor("RED")
            .setDescription(`${member.user.tag} has left, so i deleted all [ ${i.length || 0} ] of thier ads in the advertising categories!`)
            client.channels.cache.get(chan).send(embed);
});

client.login("NzgyODg5NTE1MDg5OTIwMDEw.X8SwrQ.n6j8sLSKKe7k8jZrOljPV-SL8cM");
