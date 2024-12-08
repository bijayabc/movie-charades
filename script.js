const toggleButton = document.getElementById("toggle-button")
const navLinks = document.getElementsByClassName("nav-links")[0]

toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active")
}) 

function generateSelection(choice) {
    
    // I created and used my own json file because I couldn't find a suitable API that gave me all the necessary movies by industry
    fetch("data.json")
        .then(response => response.json())
        .then(data => {

            let displayItem

            if (choice !== "random") {
                const randomIndex = Math.floor(Math.random() * data[choice].length)
                displayItem =  data[choice][randomIndex]

            } else {
                const options = ["kollywood", "bollywood", "hollywood", "editor"]

                const choiceIndex = Math.floor(Math.random() * 4)
                const randomChoice = options[choiceIndex]
    
                const randomIndex = Math.floor(Math.random() * data[randomChoice].length)
                displayItem =  data[randomChoice][randomIndex]
            }
            
            const displayText = document.getElementsByClassName("display-text")[0]
            
            // Reset the animation by temporarily removing the class
            displayText.classList.remove('animate');
            void displayText.offsetWidth; // Trigger reflow to reset animation
            displayText.classList.add('animate'); // Reapply the animation class

            displayText.innerHTML = displayItem

            // timer display
            startTimer(60)
        })
        .catch(error => {
            console.log('Error fetching or parsing JSON:', error)
        })
}3

let timerInterval = null; // Make it false so that the first timer isn't cleared and runs accurately
function startTimer(seconds) {
    if (timerInterval) {
        clearInterval(timerInterval) // If a previous timer exists, stop it.
    }
    timerInterval = setInterval(timerCountdown, 1000)

    function timerCountdown() {
        const timer = document.getElementsByClassName("time")[0]
        timer.innerHTML = "00: "+ seconds
        seconds--

        if (seconds < 0) {
            clearInterval(timerInterval)
            timer.innerHTML = "TIME'S UP"
        }
    }
}

nepaliMovie = document.getElementById("kollywood")
nepaliMovie.addEventListener("click", () => generateSelection("kollywood"))

hindiMovie = document.getElementById("bollywood")
hindiMovie.addEventListener("click", () => generateSelection("bollywood"))

englishMovie = document.getElementById("hollywood")
englishMovie.addEventListener("click", () => generateSelection("hollywood"))

editorChoice = document.getElementById("editor")
editorChoice.addEventListener("click", () => generateSelection("editor"))

randomOption = document.getElementById("random")
randomOption.addEventListener("click", () => generateSelection("random"))