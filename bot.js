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
      var chkString = message.content;
      var die = '';
      var multiple = '';
      var mult_or_die = true;
      if (chkString[0] === '!')
      {
        for (i = 1; i < chkString.length; i++)
        {
          if (typeof chkString[i] == 'number')
          {
            switch (chkString[i-1])
            {
            case '!':
              multiple = chkString[i];
              mult_or_die = true;
            break;
            case 'd':
              die = chkString[i];
              mult_or_die = false;
            break;
            default:
              switch (mult_or_die)
              {
                case true:
                  multiple+chkString[i];
                break;
                case false:
                  die+chkString[i];
                break;
              }
            break;
            }
          }
        }
        var numMultiple = Integer.parseInt(multiple);
        var numDie = Integer.parseInt(die);

        var rand = math.randomInt(1,numDie)*numMultiple;
        message.channel.send('dice roll: ' + rand);
      }

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
	});
bot.login(auth.token);
