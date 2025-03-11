'use babel';

import { CompositeDisposable } from 'atom';

async function sendMessageToOpenAI(messageContent) {
  const userMessage = messageContent;
  if (userMessage) {

      // Set up the API request data
      const model = atom.config.get('ChatGPT.Model') || 'gpt-3.5-turbo';
      const apiKey = atom.config.get('ChatGPT.APIKey');
      const customInstructions = atom.config.get('ChatGPT.CustomInstructions') || "You are a code helper, your task is to generate plain text code without using markdown for a given prompt or to fix code as instructed by prompt. Answer only with code, strictly follow syntax and code style of any presented code.";
      const data = {
          model: model,
          messages: [{ role: "user", content: userMessage }, {
              role: "system",
              content: customInstructions
          }],
          stream: true
      };
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
      };

      try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: headers,
              body: JSON.stringify(data)
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const reader = response.body.getReader();
          let partialData = '';

          var response_string = "";

          while (true) {
              const { value, done } = await reader.read();
              if (done) {
                  break;
              }
              if (value) {
                  partialData += new TextDecoder("utf-8").decode(value, { stream: true });
                  let lastNewlineIndex = partialData.lastIndexOf("\n");
                  if (lastNewlineIndex !== -1) {
                      let completeMessages = partialData.substring(0, lastNewlineIndex);
                      partialData = partialData.substring(lastNewlineIndex + 1);

                      completeMessages.split("\n").forEach((messageStr) => {
                          if (!messageStr.trim()) {
                              return;
                          }
                          if (messageStr.trim() === "data: [DONE]") {
                              return;
                          }

                          let jsonStr = messageStr.startsWith("data: ") ? messageStr.substring(5) : messageStr;
                          try {
                              const json = JSON.parse(jsonStr);
                              if (json.choices && json.choices[0].delta && json.choices[0].delta.content) {
                                  response_string += json.choices[0].delta.content;
                              }
                          } catch (e) {
                              console.error('JSON parsing error within the stream:', e);
                          }
                      });
                  }
              }
          }
          return response_string;
      } catch (error) {
          console.error("Error in sending message to ChatGPT:", error);
          atom.notifications.addError("ChatGPT Error", {
              detail: "Unable to get a response from ChatGPT. Please check your API key and internet connection.",
              dismissable: true,
          });
      }
  }
}

export default {

  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chatgpt-code-helper:fetch': () => this.fetch()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  async fetch() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let answer = await sendMessageToOpenAI(selection)
      console.log(answer)
      editor.insertText(answer)
    }
  }
};
