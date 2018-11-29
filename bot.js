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
      var content = message.content;
      if (content.length < 25){
        if (content[0] === '!')
        {
          var reNumDice = /(?:^!)([0-9]+)/;
          var reDice = /(?:d)([0-9]+)/;
          var reMod = /[\+\-\*][0-9]+/;

          var numDice;
          var dice;
          var mod;

          var prevRand = 0;
          strDice = reDice.exec(content)
          if (strDice != null)
          {
            var dice = parseInt(strDice[1], 10);
            numDice = reNumDice.exec(content);
            strMod = reMod.exec(content);
            if (numDice != null)
            {
              var maxI = parseInt(numDice[1], 10);
            } else
              maxI = 1;
            if (maxI < 255 && maxI > -255)
            {
              for(var i = 0; i < maxI; i++)
              {
              	var rand = math.randomInt(1, dice);
                prevRand += rand;
              }
            }
            rand = prevRand;
            if (strMod != null)
            {
              var str = strMod[0]
              switch(str[0])
              {
              case '+':
                logger.info(rand);
                var int = parseInt(strMod, 10);
                if (int < 255)
                  rand += int;
                logger.info(rand + " " + int);
              break;
              case '-':
                logger.info(rand);
                int = parseInt(strMod, 10);
                if (int > -255)
                  rand += int;
                logger.info(rand + " " + int);
              break;
              case '*':
                var re = /[0-9]+/;
                logger.info(rand);
                finalMod = re.exec(strMod);
                int = parseInt(finalMod, 10);
                if (int < 255)
                  rand *= int;
                logger.info(rand + " " + int);
              break;
              }
            }
            logger.info(strDice + " " + maxI + " " + strMod);
            message.channel.send('dice roll: ' + rand);
          }


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
      }
	});
bot.login(auth.token);
