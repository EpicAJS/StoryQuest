import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { gTTS } from 'gtts';

const App = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userPrompt, setUserPrompt] = useState('');
    const [story, setStory] = useState('');

    const scienceTopics = [
        "Photosynthesis",
        "The Water Cycle",
        "Electricity",
        "Gravity"
    ];

    const handleSaveProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const profile = {
            name: formData.get('name'),
            age: formData.get('age'),
            grade: formData.get('grade'),
            characters: formData.get('characters'),
            genre: formData.get('genre'),
            color: formData.get('color')
        };
        setUserProfile(profile);
        alert("Profile saved successfully!");
    };

    const generateStory = () => {
        if (!userProfile) {
            alert("Please create and save your user profile.");
            return;
        }
        
        const prompt = `Write a story on ${userPrompt} for a ${userProfile.age} year old ${userProfile.grade} grader, using the characters ${userProfile.characters} and make the story based on the genre of ${userProfile.genre}`;
        setStory(prompt); // This should call the API to get the actual story
    };

    return (
        <div>
            <h1>StoryQuest - Adventure into Learning, One Tale at a Time</h1>
            <aside>
                <h2>Create Your User Profile</h2>
                <form onSubmit={handleSaveProfile}>
                    <input name="name" placeholder="Name" required />
                    <select name="age" required>
                        {Array.from({ length: 9 }, (_, i) => (
                            <option key={i} value={i + 5}>{i + 5}</option>
                        ))}
                    </select>
                    <select name="grade" required>
                        {["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"].map((grade, index) => (
                            <option key={index} value={grade}>{grade}</option>
                        ))}
                    </select>
                    <select name="characters" required>
                        {["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"].map((character, index) => (
                            <option key={index} value={character}>{character}</option>
                        ))}
                    </select>
                    <select name="genre" required>
                        {["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"].map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                    <select name="color" required>
                        {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map((color, index) => (
                            <option key={index} value={color}>{color}</option>
                        ))}
                    </select>
                    <button type="submit">Save Profile</button>
                </form>

                {userProfile && (
                    <div>
                        <h2>User Profile Summary</h2>
                        {Object.entries(userProfile).map(([key, value]) => (
                            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
                        ))}
                    </div>
                )}
            </aside>

            <header>
                <h2>Ask a Topic or Pick a Topic Below to Explore!</h2>
                <div className="bubble-labels">
                    {scienceTopics.map((topic, index) => (
                        <button key={index} onClick={() => setUserPrompt(topic)}>{topic}</button>
                    ))}
                </div>
                <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Enter your topic here"
                />
                <button onClick={generateStory}>Generate Story</button>
            </header>

            {story && (
                <section>
                    <h3>Here's a Story for You, {userProfile?.name || 'Learner'}:</h3>
                    <p>{story}</p>
                    {/* Here you can implement the text-to-speech functionality */}
                </section>
            )}
        </div>
    );
};

export default App;
