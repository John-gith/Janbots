console.log('Mrmdr7 Bot Starting!')
var Twit = require('twit');
var config = require('./configTwit');
var T = new Twit(config);
var CronJob = require('cron').CronJob;

const myAccount = '1500224900463742979'; //Ur account to avoid replying to yourself
var statusTweet = `I have noticed a new banking protocol on the solana blockchain. It's a very interesting project with a lot of potential to be the next successor in the DeFi realm. They also merge with web3. Check @trush_io`; //Add your tweet here
var isRunning = false;
var hashtags = ['#defi', '#solana', '#airdrop' ,'#crypto' ,'#web3' , '#metaverse'];

var job = new CronJob('*/10 * * * *', function () {
    if (isRunning == false) {
        makeTweet();
        isRunning = true;
    }
});
job.start();

async function makeTweet() {
    let tweetMade = false;
    console.log('Stream is open!');
    //Setting up a user stream
    var stream = T.stream('statuses/filter', { track: hashtags });

    stream.on('tweet', function (tweet) {
        const id = tweet.id_str;

        const params = {
            in_reply_to_status_id: id,
            status: statusTweet,
            auto_populate_reply_metadata: true
        }

        if (tweet.user.id != myAccount && tweet.in_reply_to_screen_name == null && !tweet.text.includes('RT') && tweetMade == false) {
            tweetMade == true;
            T.post('statuses/update', params, tweeted);
            function tweeted(err, data, response) {
                if (err) { console.log('Tweet Failed, Make sure your tweet is under 200 characters...'); }
                else { console.log('Tweet Sent!'); }
                console.log('Tweeeeet:', tweet.text);
            }
           isRunning = false;
                stream.stop();
                return;
        }
    })
};
