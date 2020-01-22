var Discord = require('discord.js');
var fs = require('fs');
var bot = new Discord.Client();
var isReady = true;
const testFolder = './audio/';
var audio = []
var currentaudio

fs.readdirSync(testFolder).forEach(file => {
  if (file.includes(".mp3")){
    audio.push(file.substring(0,file.length-4));
  }
});
console.log(audio)
bot.on('message', message => {
  if (isReady && message.channel.id==='550674996498792452')
  {
    isReady = false;
    if (message.content==='!list'){
      message.channel.send(audio.toString())
    } else {  
      for (var i = 0; i < audio.length; i++) {
        if (audio[i].includes(message.content.substring(1,message.content.length-1))){
              var voiceChannel = message.member.voiceChannel;
              
              currentaudio=testFolder+audio[i]+'.mp3'
              voiceChannel.join().then(connection =>
                {
                  console.log('Inner: '+currentaudio)
                  const dispatcher = connection.playFile(currentaudio);
                  dispatcher.on("end", end => {
                    voiceChannel.leave();
                  });
                }).catch(err => console.log(err));
        }
      }
    }
    isReady = true;
  }
});

bot.login('NjU2MTUyOTIzNTI0NTYyOTg0.XiYCQw.EwZXtxeMKDA62Mx5MGSBrix9lnM');