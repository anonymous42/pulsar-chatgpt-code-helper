# chatgpt-code-helper package

Prompt ChatGPT right from the editor!

Give ChatGPT a prompt, select it and enable the package, the required code will be returned automatically!

### How to:

Before using this plugin make sure you have a working ChatGPT API key.

You must specify the API Key inside Pulsar config.
Also you can specify optional parameters such as model name (Model) and system prompt (CustomInstructions).
You may specify these keys in your .pulsar/config.cson:
```
ChatGPT:
  APIKey: "sk-proj-YOUR-API-KEY"
  CustomInstructions: "You are a code helper, follow given prompt to fix and generate code and answer only with plaintext code without markdown."
  Model: "gpt-4o"
```

### Thanks:

- https://github.blog/news-insights/building-your-first-atom-plugin/ for fetch function
- https://github.com/JamesClarke7283/pulsar-chatgpt/ for sendMessageToOpenAI function

[//]: <> (TODO: add GIFs with examples, how-to use, config options)
