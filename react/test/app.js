// App.js
import React from 'react';
import ChatWidget from 'ChatWidget';

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy function to simulate text-to-speech
const textToVoice = (text) => {
    // Replace with your text-to-speech implementation
    console.log(`Playing audio for: ${text}`);
};

// Main App Component
function App() {
    // State to store user profile and other variables
    const [userProfile, setUserProfile] = useState({});
    const [scienceTopics] = useState([
        "Photosynthesis",
        "The Water Cycle",
        "Electricity",
        "Gravity"
    ]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [generatedStory, setGeneratedStory] = useState("");

    // Function to save user profile
    const handleSaveProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const profile = {
            name: form.name.value,
            age: form.age.value,
            grade: form.grade.value,
            characters: form.favoriteCharacter.value,
            genre: form.favoriteGenre.value,
            color: form.favoriteColor.value,
        };
        setUserProfile(profile);
        alert('Profile saved successfully!');
    };

    // Function to get story from API (Replace with actual implementation)
    const getStoryFromGemini = async (prompt) => {
        const apiUrl = "https://api.gemini.com"; // Replace with actual API endpoint
        const apiKey = "AIzaSyAAvE3LdKicYMVF3IzJu3aH2s1yIm-Ys-g"; // Replace with actual API key

        try {
            const response = await axios.post(apiUrl, { prompt }, {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                }
            });
            return response.data.response || "No response from Gemini AI.";
        } catch (error) {
            return "Error: Failed to get a response from Gemini AI.";
        }
    };

    // Handle user prompt and generate story
    const handleGenerateStory = async () => {
        if (!selectedTopic) {
            alert('Please enter a topic to generate a story.');
            return;
        }

        const userPromptStr = `Write a story on ${selectedTopic} for a ${userProfile.age} year old ${userProfile.grade} grader, using the characters ${userProfile.characters} and make the story based on the genre of ${userProfile.genre}.`;

        try {
            const story = await getStoryFromGemini(userPromptStr);
            setGeneratedStory(story);
            textToVoice(story);
        } catch (error) {
            console.error("Error generating story:", error);
        }
    };

    return (
        <Container>
            <h1 className="text-center my-4">StoryQuest - Adventure into Learning, One Tale at a Time</h1>

            {/* User Profile Form in a Sidebar Style */}
            <Row>
                <Col md={3}>
                    <div className="p-3 bg-light border rounded">
                        <h3>Create Your User Profile</h3>
                        <Form onSubmit={handleSaveProfile}>
                            <Form.Group controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="text" name="name" required />
                            </Form.Group>

                            <Form.Group controlId="age">
                                <Form.Label>Age:</Form.Label>
                                <Form.Control as="select" name="age">
                                    {["5", "6", "7", "8", "9", "10", "11", "12", "13+"].map((age, index) => (
                                        <option key={index} value={age}>{age}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="grade">
                                <Form.Label>Grade:</Form.Label>
                                <Form.Control as="select" name="grade">
                                    {["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"].map((grade, index) => (
                                        <option key={index} value={grade}>{grade}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="favoriteCharacter">
                                <Form.Label>Favorite Character:</Form.Label>
                                <Form.Control as="select" name="favoriteCharacter">
                                    {["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"].map((character, index) => (
                                        <option key={index} value={character}>{character}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="favoriteGenre">
                                <Form.Label>Favorite Genre:</Form.Label>
                                <Form.Control as="select" name="favoriteGenre">
                                    {["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"].map((genre, index) => (
                                        <option key={index} value={genre}>{genre}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="favoriteColor">
                                <Form.Label>Favorite Color:</Form.Label>
                                <Form.Control as="select" name="favoriteColor">
                                    {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map((color, index) => (
                                        <option key={index} value={color}>{color}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3">Save Profile</Button>
                        </Form>
                    </div>
                </Col>

                {/* Main Content Area */}
                <Col md={9}>
                    <h3>Ask a Topic or Pick a Topic Below to Explore!</h3>
                    <Row className="mb-3">
                        {scienceTopics.map((topic, index) => (
                            <Col key={index} xs={6} md={3} className="mb-2">
                                <Button
                                    variant="outline-primary"
                                    className="w-100"
                                    onClick={() => setSelectedTopic(topic)}
                                >
                                    {topic}
                                </Button>
                            </Col>
                        ))}
                    </Row>

                    <Form.Group controlId="userPrompt">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter a topic or select from above..."
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="success" className="mt-3" onClick={handleGenerateStory}>Generate Story</Button>

                    {/* Story Display Section */}
                    {generatedStory && (
                        <div className="mt-4">
                            <h3>Here's a Story for You, {userProfile.name || 'Learner'}:</h3>
                            <p>{generatedStory}</p>
                        </div>
                    )}
                </Col>
            </Row>
            <div>
                {/* Your main application content goes here */}
                    <h1>Welcome to My React App</h1>
                    <p>Feel free to interact with the chatbot at the bottom right!</p>
      
                {/* Chat Widget at the bottom */}
                    <ChatWidget />
            </div>
        </Container>
    );
}

export default App;

// function App() {
//   return (
//     <div>
//       {/* Your main application content goes here */}
//       <h1>Welcome to My React App</h1>
//       <p>Feel free to interact with the chatbot at the bottom right!</p>
      
//       {/* Chat Widget at the bottom */}
//       <ChatWidget />
//     </div>
//   );
// }

//export default App;
