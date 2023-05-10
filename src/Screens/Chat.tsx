import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Configuration, OpenAIApi} from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  content: string;
  sender: 'user' | 'ai';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const handleSendMessage = async () => {
    // Send the user's message to OpenAI
    try {
      const aiKey = await AsyncStorage.getItem('@storage_APIKey');
      if (aiKey !== null) {
        const prompt = inputText;
        const config = new Configuration({apiKey: aiKey});

        const openai = new OpenAIApi(config);

        const completetion = {
          model: 'text-davinci-002',
          prompt: prompt,
          max_tokens: 1024,
          temperature: 0.5,
        };

        const response = await openai.createCompletion(completetion);
        const reply = response.data.choices[0].text;

        //Update the messages state with the user's input and OpenAI's reply
        setMessages(prevMessages => [
          ...prevMessages,
          {content: inputText, sender: 'user'},
          {content: reply, sender: 'ai'},
        ]);

        setInputText('');
      }
    } catch (e) {
      console.log('values', e);
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.botBubble,
            ]}>
            <Text style={styles.messageText}>{message.content}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },

  messageContainer: {
    flex: 1,
  },

  messageBubble: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },

  userBubble: {
    backgroundColor: 'lightblue',
    alignSelf: 'flex-end',
  },

  botBubble: {
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
  },

  messageText: {
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default Chat;
