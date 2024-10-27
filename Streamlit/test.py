import streamlit as st
import requests

# Initialize current page
if 'page' not in st.session_state:
    st.session_state['page'] = 'profile'

# Function to switch pages
def switch_page(page_name):
    st.session_state['page'] = page_name

# Function to save user profile
def save_user_profile(profile):
    st.session_state['user_profile'] = profile
    st.sidebar.success("Profile saved successfully!")
    switch_page('generate_story')  # Switch to the story generation page

# Function to interact with Gemini AI API
def get_story_from_gemini(prompt):
    api_url = "https://api.gemini.com"  # Replace with actual Gemini API endpoint
    api_key = "YOUR_API_KEY"  # Replace with your actual API key
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

# Streamlit App Title
st.title("StoryQuest - Adventure into Learning, One Tale at a Time")

# Check which page to display
if st.session_state['page'] == 'profile':
    # User Profile Page
    st.sidebar.header("Create Your User Profile")
    name = st.sidebar.text_input("Name:")
    age = st.sidebar.selectbox("Age:", ["5", "6", "7", "8", "9", "10", "11", "12", "13+"])
    grade = st.sidebar.selectbox("Grade:", ["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"])

    # Replace dropdown with buttons with images
    st.sidebar.subheader("Choose Your Favorite Character:")
    characters = {
        "Mickey Mouse and Minnie Mouse": "https://example.com/mickey_mouse_image.png",
        "Tom and Jerry": "https://example.com/tom_and_jerry_image.png",
        "Winnie the Pooh and Piglet": "https://example.com/pooh_and_piglet_image.png",
        "SpongeBob and Patrick": "https://example.com/spongebob_and_patrick_image.png"
    }
    
    # Display character buttons with images
    favorite_character = None
    cols = st.sidebar.columns(2)
    for i, (character, img_url) in enumerate(characters.items()):
        col = cols[i % 2]
        if col.button(f"Choose {character}"):
            favorite_character = character

    favorite_genre = st.sidebar.selectbox("Favorite Genre:", ["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"])
    favorite_color = st.sidebar.selectbox("Favorite Color:", ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"])

    # Button to save the user profile
    if st.sidebar.button("Save Profile") and favorite_character is not None:
        user_profile = {
            "name": name,
            "age": age,
            "grade": grade,
            "characters": favorite_character,
            "genre": favorite_genre,
            "color": favorite_color
        }
        save_user_profile(user_profile)
    elif st.sidebar.button("Save Profile") and favorite_character is None:
        st.sidebar.warning("Please select a favorite character.")

elif st.session_state['page'] == 'generate_story':
    # Story Generation Page
    if 'user_profile' in st.session_state:
        # Display user profile summary in sidebar
        st.sidebar.header("User Profile Summary")
        for key, value in st.session_state['user_profile'].items():
            st.sidebar.write(f"**{key.capitalize()}:** {value}")
        
        # CSS for equal-sized bubble labels
        st.markdown(
            """
            <style>
            .bubble-button {
                display: inline-block;
                margin: 5px;
                padding: 10px;
                font-size: 14px;
                background-color: #f0f0f0;
                color: #000;
                border-radius: 20px;
                text-align: center;
                cursor: pointer;
                width: 300px;
                height: 40px;
                line-height: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .bubble-button:hover {
                background-color: #e0e0e0;
            }
            </style>
            """,
            unsafe_allow_html=True
        )

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
            userPromptStr = (
                f"Write a story on {st.session_state['user_prompt']} for a "
                f"{st.session_state['user_profile']['age']} year old "
                f"{st.session_state['user_profile']['grade']} grader, using the characters "
                f"{st.session_state['user_profile']['characters']} and make the story based on the genre of "
                f"{st.session_state['user_profile']['genre']}."
            )
            try:
                st.write(userPromptStr)
            except:
                st.warning("Please Create and Save Your User Profile")
            if user_prompt:
                # story = get_story_from_gemini(user_prompt)
                story = "Once upon a time..."  # Placeholder story
                st.write(f"### Here's a Story for You, {st.session_state.get('user_profile', {}).get('name', 'Learner')}:")
                st.write(story)
            else:
                st.warning("Please enter a topic to generate a story.")
    else:
        st.warning("Please create and save your user profile first.")
