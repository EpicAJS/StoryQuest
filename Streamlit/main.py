import streamlit as st
import requests
from gtts import gTTS
import os
import streamlit.components.v1 as components

# Function to save user profile
def save_user_profile(profile):
    st.session_state['user_profile'] = profile
    st.sidebar.success("Profile saved successfully!")

# Function to interact with Gemini AI API
def get_story_from_gemini(prompt):
    api_url = "https://api.gemini.com"  # Replace with actual Gemini API endpoint
    api_key = "AIzaSyAAvE3LdKicYMVF3IzJu3aH2s1yIm-Ys-g"  # Replace with your actual API key
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "prompt": prompt
    }

    response = requests.post(api_url, json=data, headers=headers)
    
    if response.status_code == 200:
        return response.json().get('response', "No response from Gemini AI.")
    else:
        return "Error: Failed to get a response from Gemini AI."

def text_to_voice(text, language='en', filename='output.mp3'):
    """Converts text to speech and saves it as an MP3 file."""

    tts = gTTS(text=text, lang=language)
    tts.save(filename)
    os.system(f"start {filename}")  # Plays the audio on Windows


# Streamlit App
st.title("StoryQuest - Adventure into Learning, One Tale at a Time")

# Sidebar User Profile Form
st.sidebar.header("Create Your User Profile")
name = st.sidebar.text_input("Name:")
age = st.sidebar.selectbox("Age:", ["5","6","7","8","9","10","11","12","13+"])
grade = st.sidebar.selectbox("Grade:", ["Kindergarten","1st","2nd","3rd","4th","5th","6th","7th","8th and Above"])
favorite_character = st.sidebar.selectbox("Favorite Character:", ["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"])
favorite_genre = st.sidebar.selectbox("Favorite Genre:", ["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"])
favorite_color = st.sidebar.selectbox("Favorite Color:", ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"])

# Button to save the user profile
if st.sidebar.button("Save Profile"):
    user_profile = {
        "name": name,
        "age": age,
        "grade": grade,
        "characters": favorite_character,
        "genre": favorite_genre,
        "color": favorite_color
    }
    save_user_profile(user_profile)

colorCode = "#e34040"

if st.session_state['user_profile']['color'] == "Red":
    colorCode = "#e34040"  # Red
if st.session_state['user_profile']['color'] == "Orange":
    colorCode = "#FFA500"  # Orange
if st.session_state['user_profile']['color'] == "Yellow":
    colorCode = "#FFFF00"  # Yellow
if st.session_state['user_profile']['color'] == "Green":
    colorCode = "#008000"  # Green
if st.session_state['user_profile']['color'] == "Blue":
    colorCode = "#0000FF"  # Blue
if st.session_state['user_profile']['color'] == "Purple":
    colorCode = "#800080"  # Purple

# Display user profile in sidebar if it exists
if 'user_profile' in st.session_state:
    st.sidebar.header("User Profile Summary")
    for key, value in st.session_state['user_profile'].items():
        st.sidebar.write(f"**{key.capitalize()}:** {value}")

# CSS for equal-sized bubble labels



# Predefined science topics for kids
science_topics = [
    "Photosynthesis",
    "The Water Cycle", 
    "Electricity",
    "Gravity"
]

# Function to handle bubble button clicks
def set_prompt(selected_topic):
    st.session_state['user_prompt'] = selected_topic

# Bubble Labels Section
st.header("Ask a Topic or Pick a Topic Below to Explore!")

# Arrange bubble labels side by side
cols = st.columns(4)  # Create 4 columns for side-by-side display

for i, topic in enumerate(science_topics):
    col = cols[i % 4]  # Use modulus to distribute topics evenly across columns
    if col.button(topic):
        set_prompt(topic)

# User entry box with pre-filled value if a topic was selected
user_prompt = st.text_area(
    "",
    value=st.session_state.get('user_prompt', ''),
    key="user_prompt"
)

# Story generation button
if st.button("Generate Story"):        
    userPromptStr = "Write a story on " + st.session_state['user_prompt'] + " for a " + st.session_state['user_profile']['age'] + " year old " + st.session_state['user_profile']['grade'] + " grader, using the characters " + st.session_state['user_profile']['characters'] + " and make the story based on the genre of " + st.session_state['user_profile']['genre']
    print(userPromptStr)
    try:
        st.write(userPromptStr)
    except:
        st.warning("Please Create and Save Your User Profile")
    if user_prompt:
        #story = get_story_from_gemini(user_prompt)
        story = """Winnie the Pooh was having a lovely day by the river, dipping his toes in the cool water. The sun was shining brightly, making Pooh feel warm and sleepy. He watched as the water seemed to disappear into the air, leaving the rocks on the riverbed dry. "Where did the water go, Piglet?" he wondered aloud. Piglet, who was busy building a little sandcastle, looked up and shrugged. "I don't know, Pooh," he squeaked. "Maybe it went up to the sky!"

High above the Hundred Acre Wood, the tiny water droplets floated up, up, up into the sky. As they climbed higher, it became colder and colder. The little droplets huddled together, shivering, and turned into tiny water droplets. These droplets bumped into each other and joined together, forming fluffy white clouds. "Look, Pooh!" cried Piglet, pointing to the sky. "Those clouds look like big puffs of cotton candy!"

The clouds grew bigger and bigger as more and more water droplets joined them. Soon, they were so heavy they couldn't hold any more water. The water began to fall from the sky as raindrops. "Oh, bother," grumbled Pooh as he felt the first drops on his head. "Now we'll get all wet!" But Piglet squealed with delight and started jumping in the puddles. "This is fun, Pooh!" he cried.

The rain fell and fell, filling the river to the brim. Some of the water soaked into the ground, and some flowed back into the river. The raindrops even collected in Piglet's bucket! "Look, Pooh!" he exclaimed. "Now I have enough water to build a proper sandcastle moat!" Pooh smiled. "That's wonderful, Piglet," he said. "And when the sun comes out again, the water will go back up to the sky, and the whole thing will start all over again."""""
        st.write(f"### Here's a Story for You, {st.session_state.get('user_profile', {}).get('name', 'Learner')}:")
        st.write(story)

        #text = input(story)
        #text_to_voice(text)

    else:
        st.warning("Please enter a topic to generate a story.")


st.write("""
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      window.addEventListener("DOMContentLoaded", () => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "https://bots.dev.studio.nlx.ai/c/WbopWhDAkNy2ZTb97rZhd/d3i-zdHwUaCNVRWZsFIXy",
            headers: {
              "nlx-api-key": "5iuHS-aV_PDXpRpOI8no-VgRUB5mE7tW"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support",
            "withCollapseButton": true,
            "withCloseButton": true
          },
          // CUSTOM BEHAVIOR SNIPPET
          onExpand: (conversationHandler) => {
            const checkMessages = (messages) => {
              if (messages.length === 0) {
                conversationHandler.sendWelcomeIntent({'StoryContent': "Winnie the Pooh was having a lovely day by the river, dipping his toes in the cool water. The sun was shining brightly, making Pooh feel warm and sleepy. He watched as the water seemed to disappear into the air, leaving the rocks on the riverbed dry. Where did the water go, Piglet? he wondered aloud. Piglet, who was busy building a little sandcastle, looked up and shrugged. I don't know, Pooh, he squeaked. Maybe it went up to the sky!"});
              }
              conversationHandler.unsubscribe(checkMessages);
            };
            conversationHandler.subscribe(checkMessages);
          },
          // CUSTOM BEHAVIOR SNIPPET END
          theme: {
            "primaryColor": "#2663da",
            "darkMessageColor": "#2663da",
            "lightMessageColor": "#EFEFEF",
            "white": "#FFFFFF",
            "fontFamily": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif",
            "spacing": 12,
            "borderRadius": 8,
            "chatWindowMaxHeight": 640
          }
        });
      });
    </script>
  </body> 
""")