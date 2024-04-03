import { GoogleGenerativeAI } from "https://cdn.skypack.dev/@google/generative-ai";

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector(".chat-input i");
const chatbox = document.querySelector(".chatbox");
const toggleButton = document.querySelector('.toggle-button');
const chatbot = document.querySelector('.chatbot'); // Select the chatbot element
let userMessage;

// Function to create chat messages
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);

    const chatContent = className === "outgoing" ? `<p>${message}</p>` : `<i class="fa-solid fa-robot"></i><p>${message}</p>`;
    chatLi.innerHTML = chatContent;

    return chatLi;
}

// Function to generate AI response
const generateResponse = async () => {
    try {
        // API key for Google Generative AI
        const API_KEY = "AIzaSyBpU7HTRhvIMNfaV-eUxlx0sBsZ_tB2aqA"; // Replace "YOUR_API_KEY" with your actual API key

        // Create a new instance of GoogleGenerativeAI with your API key
        const genAI = new GoogleGenerativeAI(API_KEY);

        // Get the generative model (gemini-pro) from the API
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Prompt for the AI model
        const prompt = userMessage;

        // Generate content using the model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Remove the "Thinking.." message from the chatbox
        const thinkingMessage = chatbox.querySelector('.chat.incoming:last-child');
        if (thinkingMessage.textContent === "Thinking..") {
            chatbox.removeChild(thinkingMessage);
        }

        // Append the AI response to the chatbox
        chatbox.appendChild(createChatLi(text, "incoming"));
    } catch (error) {
        console.error("Error generating response:", error);
        // Handle error gracefully
        chatbox.appendChild(createChatLi("Error generating response. Please try again later.", "incoming"));
    }
}

// Function to handle user input
const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Append user message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    // Simulate "thinking" by showing a "Thinking.." message
    chatbox.appendChild(createChatLi("Thinking..", "incoming"));

    // Generate AI response after a delay
    setTimeout(generateResponse, 600);

    // Clear input after sending message
    chatInput.value = "";
}

// Event listener for sending messages
sendChatBtn.addEventListener("click", handleChat);

// Event listener for toggle button click
toggleButton.addEventListener('click', () => {
    chatbot.classList.toggle('show'); // Toggle 'show' class for fade animation
    chatbot.classList.toggle('hide'); // Toggle 'hide' class for fade animation
});

// Initially hide the chatbot
chatbot.classList.add('hide')