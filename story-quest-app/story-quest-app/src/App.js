import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [userPrompt, setUserPrompt] = useState('');
    const [storyData, setStoryData] = useState({ story: [], images: [], questions: [], answers: [] });
    const [loading, setLoading] = useState(false);
    const [currentSpeaking, setCurrentSpeaking] = useState(null);
    const [synth, setSynth] = useState(null);
    const [ziraVoice, setZiraVoice] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctness, setCorrectness] = useState([]);

    const scienceTopics = ["Weather and Seasons", "The Human Body", "Magnets and Electricity", "Animal Habitats and Adaptations", "Solar System", "Flora and Fauna", "The Water Cycle", "Life Cycle of a Butterfly", "Dinosaurs"];

    useEffect(() => {
        const speechSynth = window.speechSynthesis;
        setSynth(speechSynth);

        const loadVoices = () => {
            const voices = speechSynth.getVoices();
            const zira = voices.find(voice => voice.name === "Microsoft Zira Desktop - English (United States)");
            setZiraVoice(zira || voices[0]); // Fallback to the first available voice if Zira isn't found
        };

        speechSynth.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            if (speechSynth.speaking) {
                speechSynth.cancel();
            }
        };
    }, []);

    const handleSaveProfile = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const profile = {
            name: formData.get('name'),
            age: formData.get('age'),
            grade: formData.get('grade'),
            characters: formData.get('characters'),
            color: formData.get('color')
        };
        setUserProfile(profile);
        alert("Profile saved successfully!");
    };

    const generateStory = async () => {
        if (!userProfile) {
            alert("Please create your profile first!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/generate-story', {
                characters: userProfile.characters,
                content: userPrompt
            });

            const { story, images, question, answer } = response.data;
            setStoryData({ story, images, questions: question, answers: answer });
            setUserAnswers(new Array(question.length).fill(undefined));
            setCorrectness(new Array(question.length).fill(undefined));
        } catch (error) {
            console.error('Error generating story:', error);
            alert('Oops! Something went wrong. Let\'s try again!');
        } finally {
            setLoading(false);
        }
    };

    const speakText = (text, index) => {
        if (!synth || !ziraVoice) return;

        if (synth.speaking) {
            synth.cancel();
            setCurrentSpeaking(null);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = ziraVoice;
        utterance.pitch = 1.2; // Slightly higher pitch for a more child-friendly voice
        utterance.rate = 0.9; // Slightly slower rate for better comprehension

        utterance.onend = () => setCurrentSpeaking(null);
        utterance.onerror = (event) => {
            console.error('Speech error:', event);
            setCurrentSpeaking(null);
        }

        setCurrentSpeaking(index);
        synth.speak(utterance);
    };

    const handleAnswer = (questionIndex, userAnswer) => {
        const newUserAnswers = [...userAnswers];
        newUserAnswers[questionIndex] = userAnswer;
        setUserAnswers(newUserAnswers);

        const newCorrectness = [...correctness];
        if (storyData.answers[questionIndex].toLowerCase() === userAnswer.toLowerCase()) {
            newCorrectness[questionIndex] = true;
            alert("Great job! That's correct!");
        } else {
            newCorrectness[questionIndex] = false;
            alert(`Nice try! The correct answer was: ${storyData.answers[questionIndex]}`);
        }
        setCorrectness(newCorrectness);
    };

    return (
        <div className="app-container">
            <h1 className="app-title">🌟 StoryQuest Adventure 🌟</h1>
            
            {!userProfile ? (
                <div className="profile-creation">
                    <h2>Create Your Adventurer Profile!</h2>
                    <form onSubmit={handleSaveProfile} className="profile-form">
                        <input name="name" placeholder="Your Adventurer Name" required />
                        <select name="age" required>
                            {Array.from({ length: 9 }, (_, i) => (
                                <option key={i} value={i + 5}>{i + 5} years old</option>
                            ))}
                        </select>
                        <select name="grade" required>
                            {["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade"].map((grade) => (
                                <option key={grade} value={grade}>{grade}</option>
                            ))}
                        </select>
                        <select name="characters" required>
                            {["Tom and Jerry", "Mickey Mouse and Minnie Mouse", "Winnie the Pooh and Piglet", "SpongeBob and Patrick", "Pikachu and Charmandar"].map((character) => (
                                <option key={character} value={character}>{character}</option>
                            ))}
                        </select>
                        <select name="color" required>
                            {["Red", "Blue", "Green", "Purple", "Orange", "Pink"].map((color) => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                        <button type="submit" className="create-profile-btn">Start My Adventure!</button>
                    </form>
                </div>
            ) : (
                <div className="story-creation">
                    <h2>Welcome, {userProfile.name} the Adventurer!</h2>
                    <div className="topic-selection">
                        <h3>Enter your Adventure Topic or choose from the options :</h3>
                        <div className="topic-buttons">
                            {scienceTopics.map((topic) => (
                                <button key={topic} onClick={() => setUserPrompt(topic)} className="topic-btn">
                                    {topic}
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={userPrompt}
                            onChange={(e) => setUserPrompt(e.target.value)}
                            placeholder="Or type your own adventure idea here!"
                            className="adventure-input"
                        />
                        <button onClick={generateStory} disabled={loading} className="generate-story-btn">
                            {loading ? "Creating Magic..." : "Begin the Adventure!"}
                        </button>
                    </div>
                </div>
            )}

            {storyData.story.length > 0 && (
                <div className="story-display">
                    <h2>Your Magical Adventure Begins!</h2>
                    {storyData.story.map((part, index) => (
                        <div key={index} className="story-part">
                            <h3>Chapter {index + 1}</h3>
                            <p>{part}</p>
                            <button onClick={() => speakText(part, `story-${index}`)} className="read-aloud-btn">
                                {currentSpeaking === `story-${index}` ? '🔇 Pause' : '🔊 Read Aloud'}
                            </button>
                            {storyData.images[index] && (
                                <img 
                                    src={`data:image/png;base64,${storyData.images[index]}`} 
                                    alt={`Adventure Scene ${index + 1}`} 
                                    className="story-image"
                                />
                            )}
                            <div className="question-section">
                                <h4>Quest Challenge:</h4>
                                <p>{storyData.questions[index]}</p>
                                <button onClick={() => speakText(storyData.questions[index], `question-${index}`)} className="read-question-btn">
                                    {currentSpeaking === `question-${index}` ? '🔇 Pause' : '🔊 Hear the Challenge'}
                                </button>
                                <div className="answer-buttons">
                                    <button 
                                        onClick={() => handleAnswer(index, 'Yes')}
                                        disabled={userAnswers[index] !== undefined}
                                        className={userAnswers[index] === 'Yes' ? (correctness[index] ? 'correct' : 'incorrect') : ''}
                                    >
                                        Yes!
                                    </button>
                                    <button 
                                        onClick={() => handleAnswer(index, 'No')}
                                        disabled={userAnswers[index] !== undefined}
                                        className={userAnswers[index] === 'No' ? (correctness[index] ? 'correct' : 'incorrect') : ''}
                                    >
                                        No!
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;