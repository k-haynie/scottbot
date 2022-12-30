# ScottBot
A GPT2 model (trained with dialogue from The Office) that is embedded in a discord bot.

## Description
This repo provides all the code necessary for you to train Microsoft's gpt2 text generation model to speak like any persona, real or imagined, by providing it dialogue in the form of a .csv file. I have also included the files I use to run this bot on repl.it to interface the AI through discord, as most of the tutorials I found were not up-to-date with the latest discord.js library.

Regarding the model itself, the model files I have included are the result of training the gpt2-medium with dialogue from The Office found in [this kaggle dataset](https://www.kaggle.com/datasets/fabriziocominetti/the-office-lines). To try and clean up the dialogue, I removed actions or aside tags (typically enclosed inside of brackets) from the data, along with discarding lines with more than 300 characters (to prevent the bot from having confessional responses typical of Office characters). Even after having cleansed the dialogue, there were still almost 12,000 lines attributed to Michael Scott; if you are working with a smaller dataset, I would recommend finding another way to cleanse dialogue that preserves as much of the data as possible.

After I had a prepared dialogue .csv file, I loaded up a jupyter notebook I found on [freecodecamp](https://www.freecodecamp.org/news/make-a-discord-bot-that-talks-like-rick-sanchez/) to train the model. After a few training sessions I tweaked the parameters until I was satisfied with the results, settling on the gpt2-medium model as a base (instead of the tutorial's gtp2-small) and reducing the batch size to 2 (instead of 4) to accomadate the RAM I was allotted in Google Colab. Even with the reduced batch size, I had to delete quite a few of the saved checkpoints to preserve room in my Google Drive as the training was taking place - each checkpoint was around 3.5GB in size. So if you have little Google Drive space to spare, I would recommend changing the save_steps parameters in the notebook. 

The notebook uploads its produced model to [HuggingFace](https://huggingface.co/Chae/scottbot_med), where there is a built-in API to run the model. But I preferred a fancier and more intuitive way to interact with the AI, so I created a discord bot and am hosting it on [replit](https://replit.com/). To keep the bot up and running, I use [uptime robot](https://uptimerobot.com/) to ping replit periodically. 


TODO: 
- source of data, parsing
- breakdown of notebook, training, args
- hosting on huggingface, generational/conversational
- bots with replit/uptime robot
