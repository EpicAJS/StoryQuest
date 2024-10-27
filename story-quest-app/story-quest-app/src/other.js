// // // // import React, { useState } from 'react';
// // // // import axios from 'axios';
// // // // import './App.css';

// // // // const App = () => {
// // // //     const [userProfile, setUserProfile] = useState(null);
// // // //     const [userPrompt, setUserPrompt] = useState('');
// // // //     const [storyData, setStoryData] = useState({ story: [], images: [], questions: [], answers: [] });
// // // //     const [loading, setLoading] = useState(false);

// // // //     const scienceTopics = ["Photosynthesis", "The Water Cycle", "Electricity", "Gravity"];

// // // //     const handleSaveProfile = (e) => {
// // // //         e.preventDefault();
// // // //         const formData = new FormData(e.target);
// // // //         const profile = {
// // // //             name: formData.get('name'),
// // // //             age: formData.get('age'),
// // // //             grade: formData.get('grade'),
// // // //             characters: formData.get('characters'),
// // // //             genre: formData.get('genre'),
// // // //             color: formData.get('color')
// // // //         };
// // // //         setUserProfile(profile);
// // // //         alert("Profile saved successfully!");
// // // //     };

// // // //     const generateStory = async () => {
// // // //         if (!userProfile) {
// // // //             alert("Please create and save your user profile.");
// // // //             return;
// // // //         }

// // // //         setLoading(true);
// // // //         try {
// // // //             const response = await axios.post('http://localhost:5000/generate-story', {
// // // //                 characters: userProfile.characters,
// // // //                 content: userPrompt
// // // //             });

// // // //             const { story, images, question, answer } = response.data;
// // // //             setStoryData({ story, images, questions: question, answers: answer });
// // // //         } catch (error) {
// // // //             console.error('Error generating story:', error);
// // // //             alert('Failed to generate story. Please try again.');
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     };

// // // //     return (
// // // //         <div>
// // // //             <h1>StoryQuest - Adventure into Learning, One Tale at a Time</h1>
// // // //             <aside>
// // // //                 <h2>Create Your User Profile</h2>
// // // //                 <form onSubmit={handleSaveProfile}>
// // // //                     <input name="name" placeholder="Name" required />
// // // //                     <select name="age" required>
// // // //                         {Array.from({ length: 9 }, (_, i) => (
// // // //                             <option key={i} value={i + 5}>{i + 5}</option>
// // // //                         ))}
// // // //                     </select>
// // // //                     <select name="grade" required>
// // // //                         {["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"].map((grade, index) => (
// // // //                             <option key={index} value={grade}>{grade}</option>
// // // //                         ))}
// // // //                     </select>
// // // //                     <select name="characters" required>
// // // //                         {["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"].map((character, index) => (
// // // //                             <option key={index} value={character}>{character}</option>
// // // //                         ))}
// // // //                     </select>
// // // //                     <select name="genre" required>
// // // //                         {["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"].map((genre, index) => (
// // // //                             <option key={index} value={genre}>{genre}</option>
// // // //                         ))}
// // // //                     </select>
// // // //                     <select name="color" required>
// // // //                         {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map((color, index) => (
// // // //                             <option key={index} value={color}>{color}</option>
// // // //                         ))}
// // // //                     </select>
// // // //                     <button type="submit">Save Profile</button>
// // // //                 </form>

// // // //                 {userProfile && (
// // // //                     <div>
// // // //                         <h2>User Profile Summary</h2>
// // // //                         {Object.entries(userProfile).map(([key, value]) => (
// // // //                             <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
// // // //                         ))}
// // // //                     </div>
// // // //                 )}
// // // //             </aside>

// // // //             <header>
// // // //                 <h2>Ask a Topic or Pick a Topic Below to Explore!</h2>
// // // //                 <div className="bubble-labels">
// // // //                     {scienceTopics.map((topic, index) => (
// // // //                         <button key={index} onClick={() => setUserPrompt(topic)}>{topic}</button>
// // // //                     ))}
// // // //                 </div>
// // // //                 <textarea
// // // //                     value={userPrompt}
// // // //                     onChange={(e) => setUserPrompt(e.target.value)}
// // // //                     placeholder="Enter your topic here"
// // // //                 />
// // // //                 <button onClick={generateStory} disabled={loading}>
// // // //                     {loading ? "Generating..." : "Generate Story"}
// // // //                 </button>
// // // //             </header>

// // // //             {storyData.story.length > 0 && (
// // // //                 <section>
// // // //                     <h3>Here's a Story for You, {userProfile?.name || 'Learner'}:</h3>
// // // //                     {storyData.story.map((part, index) => (
// // // //                         <div key={index}>
// // // //                             <h3>Part {index + 1}:</h3>
// // // //                             <p>{part}</p>
// // // //                             {storyData.images[index] && (
// // // //                                 <img 
// // // //                                     src={`data:image/png;base64,${storyData.images[index]}`} 
// // // //                                     alt={`Story Image ${index + 1}`} 
// // // //                                     style={{maxWidth: '100%', height: 'auto'}} 
// // // //                                     onError={(e) => {
// // // //                                         e.target.onerror = null;
// // // //                                         e.target.src = '/path/to/fallback/image.png'; // Replace with actual fallback image path
// // // //                                     }}
// // // //                                 />
// // // //                             )}
// // // //                             <h4>Question:</h4>
// // // //                             <p>{storyData.questions[index]}</p>
// // // //                             <h4>Answer:</h4>
// // // //                             <p>{storyData.answers[index]}</p>
// // // //                             <hr />
// // // //                         </div>
// // // //                     ))}
// // // //                 </section>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default App;


// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import { useSpeechSynthesis } from 'react-speech-kit';
// // // import './App.css';

// // // const App = () => {
// // //     const [userProfile, setUserProfile] = useState(null);
// // //     const [userPrompt, setUserPrompt] = useState('');
// // //     const [storyData, setStoryData] = useState({ story: [], images: [], questions: [], answers: [] });
// // //     const [loading, setLoading] = useState(false);
// // //     const [currentSpeaking, setCurrentSpeaking] = useState(null);
// // //     const { speak, cancel } = useSpeechSynthesis();

// // //     const scienceTopics = ["Photosynthesis", "The Water Cycle", "Electricity", "Gravity"];

// // //     const handleSaveProfile = (e) => {
// // //         e.preventDefault();
// // //         const formData = new FormData(e.target);
// // //         const profile = {
// // //             name: formData.get('name'),
// // //             age: formData.get('age'),
// // //             grade: formData.get('grade'),
// // //             characters: formData.get('characters'),
// // //             genre: formData.get('genre'),
// // //             color: formData.get('color')
// // //         };
// // //         setUserProfile(profile);
// // //         alert("Profile saved successfully!");
// // //     };

// // //     const generateStory = async () => {
// // //         if (!userProfile) {
// // //             alert("Please create and save your user profile.");
// // //             return;
// // //         }

// // //         setLoading(true);
// // //         try {
// // //             const response = await axios.post('http://localhost:5000/generate-story', {
// // //                 characters: userProfile.characters,
// // //                 content: userPrompt
// // //             });

// // //             const { story, images, question, answer } = response.data;
// // //             setStoryData({ story, images, questions: question, answers: answer });
// // //         } catch (error) {
// // //             console.error('Error generating story:', error);
// // //             alert('Failed to generate story. Please try again.');
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const speakText = (text, index) => {
// // //         cancel();
// // //         setCurrentSpeaking(index);
// // //         speak({ text });
// // //     };

// // //     useEffect(() => {
// // //         return () => {
// // //             cancel();
// // //         };
// // //     }, [cancel]);

// // //     const handleAnswer = (questionIndex, answer) => {
// // //         alert(`You answered ${answer} to question ${questionIndex + 1}`);
// // //         // Here you can add logic to handle the answer, e.g., send it to the server or update the state
// // //     };

// // //     return (
// // //         <div>
// // //             <h1>StoryQuest - Adventure into Learning, One Tale at a Time</h1>
// // //             <aside>
// // //                 <h2>Create Your User Profile</h2>
// // //                 <form onSubmit={handleSaveProfile}>
// // //                     <input name="name" placeholder="Name" required />
// // //                     <select name="age" required>
// // //                         {Array.from({ length: 9 }, (_, i) => (
// // //                             <option key={i} value={i + 5}>{i + 5}</option>
// // //                         ))}
// // //                     </select>
// // //                     <select name="grade" required>
// // //                         {["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"].map((grade, index) => (
// // //                             <option key={index} value={grade}>{grade}</option>
// // //                         ))}
// // //                     </select>
// // //                     <select name="characters" required>
// // //                         {["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"].map((character, index) => (
// // //                             <option key={index} value={character}>{character}</option>
// // //                         ))}
// // //                     </select>
// // //                     <select name="genre" required>
// // //                         {["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"].map((genre, index) => (
// // //                             <option key={index} value={genre}>{genre}</option>
// // //                         ))}
// // //                     </select>
// // //                     <select name="color" required>
// // //                         {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map((color, index) => (
// // //                             <option key={index} value={color}>{color}</option>
// // //                         ))}
// // //                     </select>
// // //                     <button type="submit">Save Profile</button>
// // //                 </form>

// // //                 {userProfile && (
// // //                     <div>
// // //                         <h2>User Profile Summary</h2>
// // //                         {Object.entries(userProfile).map(([key, value]) => (
// // //                             <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
// // //                         ))}
// // //                     </div>
// // //                 )}
// // //             </aside>

// // //             <header>
// // //                 <h2>Ask a Topic or Pick a Topic Below to Explore!</h2>
// // //                 <div className="bubble-labels">
// // //                     {scienceTopics.map((topic, index) => (
// // //                         <button key={index} onClick={() => setUserPrompt(topic)}>{topic}</button>
// // //                     ))}
// // //                 </div>
// // //                 <textarea
// // //                     value={userPrompt}
// // //                     onChange={(e) => setUserPrompt(e.target.value)}
// // //                     placeholder="Enter your topic here"
// // //                 />
// // //                 <button onClick={generateStory} disabled={loading}>
// // //                     {loading ? "Generating..." : "Generate Story"}
// // //                 </button>
// // //             </header>

// // //             {storyData.story.length > 0 && (
// // //                 <section>
// // //                     <h3>Here's a Story for You, {userProfile?.name || 'Learner'}:</h3>
// // //                     {storyData.story.map((part, index) => (
// // //                         <div key={index}>
// // //                             <h3>Part {index + 1}:</h3>
// // //                             <p>{part}</p>
// // //                             <button onClick={() => speakText(part, `story-${index}`)}>
// // //                                 {currentSpeaking === `story-${index}` ? 'Stop' : 'Read Aloud'}
// // //                             </button>
// // //                             {storyData.images[index] && (
// // //                                 <img 
// // //                                     src={`data:image/png;base64,${storyData.images[index]}`} 
// // //                                     alt={`Story Image ${index + 1}`} 
// // //                                     style={{maxWidth: '100%', height: 'auto'}} 
// // //                                     onError={(e) => {
// // //                                         e.target.onerror = null;
// // //                                         e.target.src = '/path/to/fallback/image.png'; // Replace with actual fallback image path
// // //                                     }}
// // //                                 />
// // //                             )}
// // //                             <h4>Question:</h4>
// // //                             <p>{storyData.questions[index]}</p>
// // //                             <button onClick={() => speakText(storyData.questions[index], `question-${index}`)}>
// // //                                 {currentSpeaking === `question-${index}` ? 'Stop' : 'Read Question'}
// // //                             </button>
// // //                             <div>
// // //                                 <button onClick={() => handleAnswer(index, 'Yes')}>Yes</button>
// // //                                 <button onClick={() => handleAnswer(index, 'No')}>No</button>
// // //                             </div>
// // //                             <hr />
// // //                         </div>
// // //                     ))}
// // //                 </section>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default App;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import './App.css';

// // const App = () => {
// //     const [userProfile, setUserProfile] = useState(null);
// //     const [userPrompt, setUserPrompt] = useState('');
// //     const [storyData, setStoryData] = useState({ story: [], images: [], questions: [], answers: [] });
// //     const [loading, setLoading] = useState(false);
// //     const [currentSpeaking, setCurrentSpeaking] = useState(null);
// //     const [synth, setSynth] = useState(null);

// //     const scienceTopics = ["Photosynthesis", "The Water Cycle", "Electricity", "Gravity"];

// //     useEffect(() => {
// //         // Initialize speech synthesis
// //         const speechSynth = window.speechSynthesis;
// //         setSynth(speechSynth);

// //         return () => {
// //             if (speechSynth.speaking) {
// //                 speechSynth.cancel();
// //             }
// //         };
// //     }, []);

// //     const handleSaveProfile = (e) => {
// //         e.preventDefault();
// //         const formData = new FormData(e.target);
// //         const profile = {
// //             name: formData.get('name'),
// //             age: formData.get('age'),
// //             grade: formData.get('grade'),
// //             characters: formData.get('characters'),
// //             genre: formData.get('genre'),
// //             color: formData.get('color')
// //         };
// //         setUserProfile(profile);
// //         alert("Profile saved successfully!");
// //     };

// //     const generateStory = async () => {
// //         if (!userProfile) {
// //             alert("Please create and save your user profile.");
// //             return;
// //         }

// //         setLoading(true);
// //         try {
// //             const response = await axios.post('http://localhost:5000/generate-story', {
// //                 characters: userProfile.characters,
// //                 content: userPrompt
// //             });

// //             const { story, images, question, answer } = response.data;
// //             setStoryData({ story, images, questions: question, answers: answer });
// //         } catch (error) {
// //             console.error('Error generating story:', error);
// //             alert('Failed to generate story. Please try again.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const speakText = (text, index) => {
// //         if (!synth) {
// //             console.error('Speech synthesis not supported');
// //             return;
// //         }

// //         if (synth.speaking) {
// //             console.error('Speech in progress');
// //             synth.cancel();
// //             setCurrentSpeaking(null);
// //             return;
// //         }

// //         const utterance = new SpeechSynthesisUtterance(text);
// //         utterance.onend = () => setCurrentSpeaking(null);
// //         utterance.onerror = (event) => {
// //             console.error('SpeechSynthesisUtterance error', event);
// //             setCurrentSpeaking(null);
// //         }

// //         setCurrentSpeaking(index);
// //         synth.speak(utterance);
// //     };

// //     const handleAnswer = (questionIndex, answer) => {
// //         alert(`You answered ${answer} to question ${questionIndex + 1}`);
// //         // Here you can add logic to handle the answer, e.g., send it to the server or update the state
// //     };

// //     return (
// //         <div className="app-container">
// //             <h1>StoryQuest - Adventure into Learning, One Tale at a Time</h1>
            
// //             <div className="profile-section">
// //                 <h2>Create Your User Profile</h2>
// //                 <form onSubmit={handleSaveProfile}>
// //                     <input name="name" placeholder="Name" required />
// //                     <select name="age" required>
// //                         {Array.from({ length: 9 }, (_, i) => (
// //                             <option key={i} value={i + 5}>{i + 5}</option>
// //                         ))}
// //                     </select>
// //                     <select name="grade" required>
// //                         {["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"].map((grade, index) => (
// //                             <option key={index} value={grade}>{grade}</option>
// //                         ))}
// //                     </select>
// //                     <select name="characters" required>
// //                         {["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"].map((character, index) => (
// //                             <option key={index} value={character}>{character}</option>
// //                         ))}
// //                     </select>
// //                     <select name="genre" required>
// //                         {["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"].map((genre, index) => (
// //                             <option key={index} value={genre}>{genre}</option>
// //                         ))}
// //                     </select>
// //                     <select name="color" required>
// //                         {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map((color, index) => (
// //                             <option key={index} value={color}>{color}</option>
// //                         ))}
// //                     </select>
// //                     <button type="submit">Save Profile</button>
// //                 </form>

// //                 {userProfile && (
// //                     <div className="profile-summary">
// //                         <h3>User Profile Summary</h3>
// //                         {Object.entries(userProfile).map(([key, value]) => (
// //                             <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>

// //             <div className="story-generation">
// //                 <h2>Ask a Topic or Pick a Topic Below to Explore!</h2>
// //                 <div className="topic-buttons">
// //                     {scienceTopics.map((topic, index) => (
// //                         <button key={index} onClick={() => setUserPrompt(topic)}>{topic}</button>
// //                     ))}
// //                 </div>
// //                 <textarea
// //                     value={userPrompt}
// //                     onChange={(e) => setUserPrompt(e.target.value)}
// //                     placeholder="Enter your topic here"
// //                 />
// //                 <button onClick={generateStory} disabled={loading}>
// //                     {loading ? "Generating..." : "Generate Story"}
// //                 </button>
// //             </div>

// //             {storyData.story.length > 0 && (
// //                 <div className="story-section">
// //                     <h2>Here's a Story for You, {userProfile?.name || 'Learner'}:</h2>
// //                     {storyData.story.map((part, index) => (
// //                         <div key={index} className="story-part">
// //                             <h3>Part {index + 1}:</h3>
// //                             <p>{part}</p>
// //                             <button onClick={() => speakText(part, `story-${index}`)}>
// //                                 {currentSpeaking === `story-${index}` ? 'Stop' : 'Read Aloud'}
// //                             </button>
// //                             {storyData.images[index] && (
// //                                 <img 
// //                                     src={`data:image/png;base64,${storyData.images[index]}`} 
// //                                     alt={`Story Image ${index + 1}`} 
// //                                     style={{maxWidth: '100%', height: 'auto'}} 
// //                                     onError={(e) => {
// //                                         e.target.onerror = null;
// //                                         e.target.src = '/path/to/fallback/image.png'; // Replace with actual fallback image path
// //                                     }}
// //                                 />
// //                             )}
// //                             <div className="question-section">
// //                                 <h4>Question:</h4>
// //                                 <p>{storyData.questions[index]}</p>
// //                                 <button onClick={() => speakText(storyData.questions[index], `question-${index}`)}>
// //                                     {currentSpeaking === `question-${index}` ? 'Stop' : 'Read Question'}
// //                                 </button>
// //                                 <div className="answer-buttons">
// //                                     <button onClick={() => handleAnswer(index, 'Yes')}>Yes</button>
// //                                     <button onClick={() => handleAnswer(index, 'No')}>No</button>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//     const [userProfile, setUserProfile] = useState(null);
//     const [userPrompt, setUserPrompt] = useState('');
//     const [storyData, setStoryData] = useState({ story: [], images: [], questions: [], answers: [] });
//     const [loading, setLoading] = useState(false);
//     const [currentSpeaking, setCurrentSpeaking] = useState(null);
//     const [synth, setSynth] = useState(null);
//     const [ziraVoice, setZiraVoice] = useState(null);

//     const scienceTopics = ["Photosynthesis", "The Water Cycle", "Electricity", "Gravity"];

//     useEffect(() => {
//         const speechSynth = window.speechSynthesis;
//         setSynth(speechSynth);

//         const loadVoices = () => {
//             const voices = speechSynth.getVoices();
//             const zira = voices.find(voice => voice.name === "Microsoft Zira Desktop - English (United States)");
//             setZiraVoice(zira || voices[0]);
//         };

//         speechSynth.onvoiceschanged = loadVoices;
//         loadVoices();

//         return () => {
//             if (speechSynth.speaking) {
//                 speechSynth.cancel();
//             }
//         };
//     }, []);

//     const handleSaveProfile = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const profile = {
//             name: formData.get('name'),
//             age: formData.get('age'),
//             grade: formData.get('grade'),
//             characters: formData.get('characters'),
//             genre: formData.get('genre'),
//             color: formData.get('color')
//         };
//         setUserProfile(profile);
//         alert("Profile saved successfully!");
//     };

//     const generateStory = async () => {
//         if (!userProfile) {
//             alert("Please create your profile first!");
//             return;
//         }

//         setLoading(true);
//         try {
//             const response = await axios.post('http://localhost:5000/generate-story', {
//                 characters: userProfile.characters,
//                 content: userPrompt
//             });

//             const { story, images, question, answer } = response.data;
//             setStoryData({ story, images, questions: question, answers: answer });
//         } catch (error) {
//             console.error('Error generating story:', error);
//             alert('Oops! Something went wrong. Let\'s try again!');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const speakText = (text, index) => {
//         if (!synth || !ziraVoice) return;

//         if (synth.speaking) {
//             synth.cancel();
//             setCurrentSpeaking(null);
//             return;
//         }

//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.voice = ziraVoice;
//         utterance.pitch = 1.2;
//         utterance.rate = 0.9;

//         utterance.onend = () => setCurrentSpeaking(null);
//         utterance.onerror = (event) => {
//             console.error('Speech error:', event);
//             setCurrentSpeaking(null);
//         }

//         setCurrentSpeaking(index);
//         synth.speak(utterance);
//     };

//     return (
//         <div className="app-container">
//             <h1 className="app-title">StoryQuest Adventure</h1>
            
//             {!userProfile ? (
//                 <div className="profile-creation">
//                     <h2>Create Your Adventurer Profile</h2>
//                     <form onSubmit={handleSaveProfile} className="profile-form">
//                         <input name="name" placeholder="Your Name" required />
//                         <select name="age" required>
//                             {Array.from({ length: 9 }, (_, i) => (
//                                 <option key={i} value={i + 5}>{i + 5} years old</option>
//                             ))}
//                         </select>
//                         <select name="grade" required>
//                             {["Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th and Above"].map((grade) => (
//                                 <option key={grade} value={grade}>{grade}</option>
//                             ))}
//                         </select>
//                         <select name="characters" required>
//                             {["Mickey Mouse and Minnie Mouse", "Tom and Jerry", "Winnie the Pooh and Piglet", "SpongeBob and Patrick"].map((character) => (
//                                 <option key={character} value={character}>{character}</option>
//                             ))}
//                         </select>
//                         <select name="genre" required>
//                             {["Fantasy", "Science Fiction", "Mystery", "Adventure", "Comedy"].map((genre) => (
//                                 <option key={genre} value={genre}>{genre}</option>
//                             ))}
//                         </select>
//                         <select name="color" required>
//                             {["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink"].map((color) => (
//                                 <option key={color} value={color}>{color}</option>
//                             ))}
//                         </select>
//                         <button type="submit" className="create-profile-btn">Create Profile</button>
//                     </form>
//                 </div>
//             ) : (
//                 <div className="story-creation">
//                     <h2>Welcome, {userProfile.name}!</h2>
//                     <div className="topic-selection">
//                         <h3>Choose Your Adventure Topic:</h3>
//                         <div className="topic-buttons">
//                             {scienceTopics.map((topic) => (
//                                 <button key={topic} onClick={() => setUserPrompt(topic)} className="topic-btn">
//                                     {topic}
//                                 </button>
//                             ))}
//                         </div>
//                         <textarea
//                             value={userPrompt}
//                             onChange={(e) => setUserPrompt(e.target.value)}
//                             placeholder="Or type your own adventure idea here!"
//                             className="adventure-input"
//                         />
//                         <button onClick={generateStory} disabled={loading} className="generate-story-btn">
//                             {loading ? "Generating..." : "Create Story"}
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {storyData.story.length > 0 && (
//                 <div className="story-display">
//                     <h2>Your Adventure</h2>
//                     {storyData.story.map((part, index) => (
//                         <div key={index} className="story-part">
//                             <h3>Part {index + 1}</h3>
//                             <p>{part}</p>
//                             <button onClick={() => speakText(part, `story-${index}`)} className="read-aloud-btn">
//                                 {currentSpeaking === `story-${index}` ? 'Pause' : 'Read Aloud'}
//                             </button>
//                             {storyData.images[index] && (
//                                 <img 
//                                     src={`data:image/png;base64,${storyData.images[index]}`} 
//                                     alt={`Story Image ${index + 1}`} 
//                                     className="story-image"
//                                 />
//                             )}
//                             <div className="question-section">
//                                 <h4>Question:</h4>
//                                 <p>{storyData.questions[index]}</p>
//                                 <button onClick={() => speakText(storyData.questions[index], `question-${index}`)} className="read-question-btn">
//                                     {currentSpeaking === `question-${index}` ? 'Pause' : 'Read Question'}
//                                 </button>
//                                 <div className="answer-buttons">
//                                     <button onClick={() => alert("You answered Yes!")}>Yes</button>
//                                     <button onClick={() => alert("You answered No!")}>No</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default App;