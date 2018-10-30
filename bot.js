var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var fetch = require('node-fetch');
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var math = require('mathjs');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({});
bot.on('ready', function (evt) {
    logger.info('Connected');
});
bot.on('message', message => {
	logger.info('user: ' + message.author.id + ' channel: ' + message.channel);
			if (message.content === 'hitme')
			{
				var rand = math.randomInt(2,19809);

				var src;
				logger.info('hitme'+' '+rand);
				var pageToVisit = "http://herpy.nu/gallery/displayimage.php?pid=" + rand;
				request(pageToVisit, function(error, response, body) {
				if(response.statusCode === 200) {
					var $ = cheerio.load(body);
					$('img.image').each(function(i, element){
						var src = $(this).attr("src");
						logger.info(src);
						message.channel.send('Here you go daddy 0w0');
						message.channel.send({
						files: ['http://herpy.nu/gallery/' + src]});
					});
				}
				});

			}
		switch (message.channel.id){
		case '443856347205992448':
		case '443856411143831552':
			switch(message.author.id)
			{
				case '120630439378550786':
					message.channel.send('Ah hello God');
					break;
				case '377576184395071488':
					message.channel.send('DRAGON CHAN');
					break;
				case '214845257731407872':
					message.channel.send('Fuck Off');
					break;
				default:
					break;
		}
		break;
	}
});
bot.on("guildMemberAdd", (member) => {
	bot.channels.get('443856411143831552').send('oh hello dick');
});
bot.login(auth.token);
