# ScottBot
A gpt2 model (trained with dialogue from The Office) that is embedded in a discord bot.

## Description
This repo provides all the code necessary for you to train Microsoft's [gpt2](https://huggingface.co/gpt2) text generation model to speak like any persona, real or imagined, by providing it dialogue in the form of a `.csv` file. I have also included the files I use to run this bot on [replit](https://replit.com/) to interface the AI through discord, as most of the tutorials I found were not up-to-date with the latest `discord.js` library.

Regarding the model itself, the model files I have included are the result of training the `gpt2-medium` model with dialogue from The Office found in [this kaggle dataset](https://www.kaggle.com/datasets/fabriziocominetti/the-office-lines). I removed actions or aside tags (typically enclosed inside of brackets) from the data, along with discarding lines with more than 300 characters (trimming out long confessionals). Afterwards, I was left with close to 12,000 lines of Michael Scott dialogue alone, with thousands more for the rest of the characters.

After I had a prepared dialogue `.csv` file, I loaded up a jupyter notebook I found on [freecodecamp](https://www.freecodecamp.org/news/make-a-discord-bot-that-talks-like-rick-sanchez/) to train the model. After a few training sessions I tweaked the parameters until I was satisfied with the results, settling on the `gpt2-medium` model as a base (instead of the tutorial's `gtp2-small`) and reducing the `per_gpu_train_batch_size` to 2 to accommodate the RAM I was allotted in Google Colab. Even with the reduced batch size, I had to delete quite a few of the saved checkpoints to preserve room in my Google Drive as the training was taking place - each new checkpoint was around 3.5 GB in size. So if you have little Google Drive space to spare, I would recommend changing the `save_steps` parameters in the notebook. 

The notebook uploads its produced model to [HuggingFace](https://huggingface.co/Chae/scottbot_med), where there is a built-in API to run the model. But I wanted a fancier and more intuitive way to interact with the AI, so I created a discord bot and am hosting it on [replit](https://replit.com/), which I keep alive through the services of [UptimeRobot](https://uptimerobot.com/). 

## Requirements:
#### Parsing:
- [Kaggle account](https://www.kaggle.com/) (downloading datasets)
- [Python 3+](https://www.python.org/downloads/release/python-3109/)
- [Pip](https://pypi.org/project/pip/#files)
- Re via `pip install re`

#### Training:
- [Google Drive](https://drive.google.com/) (minimum 4GB empty space)
- [Google Colab](https://colab.research.google.com/)
- [HuggingFace account](https://huggingface.co/)

#### Bot Creation:
- [Discord account](https://discord.com/developers/applications)
- [Replit account](https://replit.com/)
- [UptimeRobot account](https://uptimerobot.com/)

## Usage
The first order of business is getting data to feed to the model. I used a dataset I found on Kaggle, but many other sites have `.csv` files of dialogue from a variety of shows, movies, and games. Keep in mind that `parse_data.py` was specifically tailored to the dataset I was using; it may require a little editing to work for your specific dataset. Once you have a satisfactory dataset, upload your `.csv` file and the `scottbot.ipynb` file to Google Drive.

Before running the notebook, ensure that it can find your dialogue file by changing the `data = pd.read_csv("filename.csv")` to your particular filename along with the the value of `"CHARACTER_NAME"` to the appropriate name. Fun parameters to mess with are the number of lines included in line context (by default 7, denoted by variable `n`), `args.num_train_epochs`, `args.per_gpu_train_batch_size`, and `args.seed`. If you want speedier training or have little extra Google Drive space, I recommend changign the tokenizer and model to `microsoft/DialoGPT-small` (references inside of the `Args` class will have to be changed as well). At the very end of the notebook, there is authorization to provide: an email, your HuggingFace account name, a name for your model, and a HuggingFace API key (found under the Access Tokens tab in your HuggingFace Account settings. 


TODO: 
- source of data, parsing
- breakdown of notebook, training, args
- hosting on huggingface, generational/conversational
- bots with replit/uptime robot
