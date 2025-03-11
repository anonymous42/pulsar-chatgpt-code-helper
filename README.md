# Pulsar chatgpt-code-helper package

Prompt ChatGPT right from the Pulsar editor!

Give ChatGPT a prompt, select it and enable the package, the required code will be returned automatically!

### How to:

Before using this plugin make sure you have a working ChatGPT API key.

You must specify the API Key inside Pulsar config.

Also you can specify optional parameters such as model name (Model) and system prompt (CustomInstructions).

Specify these keys in your .pulsar/config.cson:
```
ChatGPT:
  APIKey: "sk-proj-YOUR-API-KEY"
  CustomInstructions: "You are a code helper, ..."
  Model: "gpt-4o"
```

After specifying the key, reload Pulsar.

Now you can use the package.

While editing any file, write your prompt right in the text file.

All selected text will be sent to ChatGPT, so you can generate new code by selecting only prompt string or fix existing code by selecting fix prompt and the code that needs to be fixed.

### Thanks:

- https://github.blog/news-insights/building-your-first-atom-plugin/ for fetch function
- https://github.com/JamesClarke7283/pulsar-chatgpt/ for sendMessageToOpenAI function

[//]: <> (TODO: add GIFs with examples, how-to use, config options)
