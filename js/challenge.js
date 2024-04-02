document.addEventListener("DOMContentLoaded", function() {
    // Variables to track counter value, elements, likes, and pause state
    let counterValue = 0;
    const counterDisplay = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const likeButton = document.getElementById("heart");
    const likesList = document.querySelector(".likes");
    const pauseButton = document.getElementById("pause");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentsList = document.getElementById("list");
    let isPaused = false;
    let timer;
    const likes = {};

    // Function to update counter display
    const updateCounterDisplay = () => {
        counterDisplay.textContent = counterValue;
    };

    // Function to increment counter
    const incrementCounter = () => {
        counterValue++;
        updateCounterDisplay();
    };

    // Function to decrement counter
    const decrementCounter = () => {
        counterValue--;
        updateCounterDisplay();
    };

    // Function to handle like button click
    const handleLikeClick = () => {
        if (!likes[counterValue]) {
            likes[counterValue] = 1;
        } else {
            likes[counterValue]++;
        }

        const existingLike = document.getElementById(`like-${counterValue}`);
        if (existingLike) {
            existingLike.textContent = `${counterValue} has been liked ${likes[counterValue]} times`;
        } else {
            const newLike = document.createElement("li");
            newLike.id = `like-${counterValue}`;
            newLike.textContent = `${counterValue} has been liked ${likes[counterValue]} times`;
            likesList.appendChild(newLike);
        }
    };

    // Function to handle pause button click
    const togglePause = () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? "resume" : "pause";
        plusButton.disabled = isPaused;
        minusButton.disabled = isPaused;
        likeButton.disabled = isPaused;

        if (isPaused) {
            clearInterval(timer);
        } else {
            timer = setInterval(incrementCounter, 1000);
        }
    };

    // Event listeners for plus, minus, like, pause buttons
    plusButton.addEventListener("click", incrementCounter);
    minusButton.addEventListener("click", decrementCounter);
    likeButton.addEventListener("click", handleLikeClick);
    pauseButton.addEventListener("click", togglePause);

    // Event listener for comment form submission
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const commentText = commentInput.value;
        const commentItem = document.createElement("div");
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);
        commentInput.value = "";
    });

    // Start the timer
    timer = setInterval(incrementCounter, 1000);
});