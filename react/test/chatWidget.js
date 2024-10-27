// ChatWidget.js
import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Load the chat widget script
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js";
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize the chat widget after the script is loaded
      const widget = window.nlxai.chatWidget.create({
        config: {
          botUrl: "https://bots.dev.studio.nlx.ai/c/WbopWhDAkNy2ZTb97rZhd/d3i-zdHwUaCNVRWZsFIXy",
          headers: {
            "nlx-api-key": "5iuHS-aV_PDXpRpOI8no-VgRUB5mE7tW"
          },
          languageCode: "en-US"
        },
        titleBar: {
          title: "Support",
          withCollapseButton: true,
          withCloseButton: true
        },
        onExpand: (conversationHandler) => {
          const checkMessages = (messages) => {
            if (messages.length === 0) {
              conversationHandler.sendWelcomeIntent({
                'StoryContent': "Winnie the Pooh was having a lovely day by the river, dipping his toes in the cool water. The sun was shining brightly, making Pooh feel warm and sleepy. He watched as the water seemed to disappear into the air, leaving the rocks on the riverbed dry. Where did the water go, Piglet? he wondered aloud. Piglet, who was busy building a little sandcastle, looked up and shrugged. I don't know, Pooh, he squeaked. Maybe it went up to the sky!"
              });
            }
            conversationHandler.unsubscribe(checkMessages);
          };
          conversationHandler.subscribe(checkMessages);
        },
        theme: {
          primaryColor: "#2663da",
          darkMessageColor: "#2663da",
          lightMessageColor: "#EFEFEF",
          white: "#FFFFFF",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
          spacing: 12,
          borderRadius: 8,
          chatWindowMaxHeight: 640
        }
      });
    };

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        zIndex: 1000
      }}
    >
      {/* The chat widget will be loaded into the DOM dynamically */}
    </div>
  );
};

export default ChatWidget;
