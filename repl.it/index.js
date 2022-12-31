const { Client, Partials, GatewayIntentBits } = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")

// create a client with message permissions
const client = new Client({
  'intents': [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
  ],
  
  // this is necessary circa discord.js 14 for DM permissions
  'partials': [Partials.Channel]
})

// Send a an API query to HuggingFace
async function query(data) {
  // initialize typing status
  data.channel.sendTyping()
  
  // format the API query with authorization and headers
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Chae/scottbot_med",
    {
      headers: { Authorization: `Bearer ${process.env['HF_TOKEN']}` },
      method: "POST",
      body: JSON.stringify({
        "inputs": { "text": data.content},
        "parameters": {
          // add randomizing
          "do_sample": true,
          // prevent caching of results
          "use_cache": false,
          // penalize grams repeated > 5 times
          "no_repeat_ngram_size": 5,
          // optimized search
          "top_k": 100,
          // hopefully curbing output bugs
          "max_time": 10
        }
      }),
    }
  );

  const result = await response.json()

  try {
    // Ideal result - get response
    text = result["generated_text"]
  } catch {

    if (result.contains("error")) {
      // error logging
      text = `Error thrown: ${result['error']}`
    } else {
      // no response at all
      text = "What were you saying? Dwight was distracting me."
    }
  }
  try {
    await data.channel.send(text)
  }
  catch {
    // returns an invalid response
    data.channel.send("Either this invalid input, or I'm still waking up! Try again in a few seconds.")
  }
}

// load the discord user
client.on("ready", () => {
  console.log(`${client.user.tag} is logged in`)
})

// on a message, get contents and query API
client.on("messageCreate", msg => {
  if (msg.author.bot) return
  else {
    query(msg)
  }
})

// launch an express.js server to keep this process running
keepAlive()

// start the bot
client.login(process.env['DISCORD_TOKEN'])
