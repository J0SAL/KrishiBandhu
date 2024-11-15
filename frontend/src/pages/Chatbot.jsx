import React, { useEffect, useRef } from "react";
import { DeepChat } from "deep-chat-react";

const Chatbot = () => {
  const initialMessages = [
    { role: "ai", text: "Hey KrishiBandhu here, how can I help you today?" },
  ];
  const chatElementRef = useRef(null);

  useEffect(() => {
    if (chatElementRef.current) {
      // chatElementRef.current.messageStyles = {
      //   html: {
      //     shared: {
      //       bubble: {
      //         backgroundColor: "unset",
      //         padding: "0px",
      //         width: "100%",
      //         textAlign: "right",
      //       },
      //     },
      //   },
      // };
      chatElementRef.current.submitButtonStyles = {
        disabled: { container: { default: { opacity: 0, cursor: "auto" } } },
      };
      chatElementRef.current.onNewMessage = ({ message, isInitial }) => {
        if (
          !isInitial &&
          message.role === "ai" &&
          message.text !== "Thanks recorded!"
        ) {
          console.log("in ref : ", isInitial, message);
          // chatElementRef.current.responseInterceptor = (message) => {
          //   return message;
          // };
          // chatElementRef.current.responseInterceptor = () => {
          //   return { role: "ai", text: "feedback" };
          // };
          chatElementRef.current._addMessage({
            text: "Was the response satisfactory?",
            role: "ai",
          });
          chatElementRef.current._addMessage({
            role: "user",
            html: `
            <div class="deep-chat-temporary-message">
              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button>
            </div>`,
          });
        }
      };

      chatElementRef.current.responseInterceptor = (a) => {
        return a[0];
      };
    }
  }, []);
  return (
    <div>
      {" "}
      <DeepChat
        ref={chatElementRef}
        style={{
          // visibility: showChat ? "visible" : "hidden",
          position: "absolute",
          top: "calc(50% - 120px)", // Adjust this value based on the desired spacing and size of your DeepChat component
          // left: 0,
          right: 16,
          bottom: 0,
          borderRadius: "10px",
          zIndex: 1, // Ensure it's above other content
        }}
        request={{
          url: "http://192.168.1.5:5000/api/chat",
          method: "POST",
        }}
        // textToSpeech="true"
        speechToText={{
          webSpeech: true,
          translations: { hello: "goodbye", Hello: "Goodbye" },
          commands: { resume: "resume", settings: { commandMode: "hello" } },
          button: { position: "outside-left" },
        }}
        textInput={{ placeholder: { text: "Welcome to the demo!" } }}
        initialMessages={initialMessages}
        messageStyles={{
          default: {
            user: { bubble: { backgroundColor: "#07af5e" } },
          },
        }}
      />
    </div>
  );
};

export default Chatbot;