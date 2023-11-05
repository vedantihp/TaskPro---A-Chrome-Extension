const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const searchBox = document.querySelector(".search-box");
const inpWord = document.getElementById("inp-word");
const searchBtn = document.getElementById("search-btn");
const result = document.getElementById("result");


searchBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent click on the search button from closing the box
    const query = inpWord.value.trim();
    if (query !== "") {
        fetch(`${url}${query}`)
            .then((response) => response.json())
            .then((data) => {
                // Display the result
                result.innerHTML = `
                <div class="word">
                    <h3>${query}</h3>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
                sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
            })
            .catch(() => {
                result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            });
    }
});

// Add a click event listener to the entire document
document.addEventListener("click", (event) => {
    // Check if the click was outside the search box
    if (event.target !== searchBox && !searchBox.contains(event.target)) {
        // Close the search box
        result.innerHTML = "";
    }
});


var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
  
    init: function () {
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
  
      document.querySelector('#work').addEventListener('click', function () {
        if (!self.started) {
          self.startWork.apply(self);
        }
      });
  
      document.querySelector('#shortBreak').addEventListener('click', function () {
        if (!self.started) {
          self.startShortBreak.apply(self);
        }
      });
  
      document.querySelector('#longBreak').addEventListener('click', function () {
        if (!self.started) {
          self.startLongBreak.apply(self);
        }
      });
  
      document.querySelector('#stop').addEventListener('click', function () {
        self.stopTimer.apply(self);
      });
  
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
  
    resetVariables: function (mins, secs, started) {
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 100 / (this.minutes * 60);
      this.fillerHeight = 0;
    },
  
    startWork: function () {
      if (!this.started) {
        this.resetVariables(25, 0, true);
        this.startTimer();
      }
    },
  
    startShortBreak: function () {
      if (!this.started) {
        this.resetVariables(5, 0, true);
        this.startTimer();
      }
    },
  
    startLongBreak: function () {
      if (!this.started) {
        this.resetVariables(15, 0, true);
        this.startTimer();
      }
    },
  
    startTimer: function () {
      var self = this;
      this.interval = setInterval(function () {
        self.intervalCallback.apply(self);
      }, 1000);
    },
  
    stopTimer: function () {
      this.resetVariables(25, 0, false);
      clearInterval(this.interval);
      this.updateDom();
    },
  
    toDoubleDigit: function (num) {
      if (num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
  
    updateDom: function () {
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerDom.style.height = this.fillerHeight + '%';
    },
  
    intervalCallback: function () {
      if (!this.started) return false;
      if (this.seconds == 0) {
        if (this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.fillerHeight += this.fillerIncrement;
      this.updateDom();
    },
  
    timerComplete: function () {
      this.started = false;
      clearInterval(this.interval);
      this.fillerHeight = 0;
      this.updateDom();
    },
  };
  
  window.onload = function () {
    pomodoro.init();
  };
  
  //Greetings and Time
fetch("https://api.unsplash.com/photos/random/?client_id=")
.then(res => res.json())
.then(data => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
});

let timeDisplay = document.getElementById("clocktime");
let greeting = document.getElementById("greeting");

function currentTime() {
    const date = new Date();
    timeDisplay.textContent = date.toLocaleTimeString("en-us", { timeStyle: "medium" })
    if (date.toLocaleTimeString("en-us", { timestyle: "long" }).includes("PM")) {
        greeting.textContent = "Good evening!";
    } else {
        greeting.textContent = "Good morning!";
    };
};

setInterval(currentTime, 1000);


// To-Do List

        const taskInput = document.getElementById("task-input");
        const taskList = document.getElementById("task-list");
        const printButton = document.getElementById("print-button");

        let tasks = [];

        // Load tasks from localStorage if available
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }

        function saveTasks() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function addTask(taskText) {
            tasks.push({ text: taskText, completed: false });
            updateTaskList();
            saveTasks(); // Save tasks to localStorage
        }

        function updateTaskList() {
            taskList.innerHTML = "";
            tasks.forEach((task, index) => {
                const taskItem = document.createElement("li");
                taskItem.innerHTML = `
                    <input type="checkbox" id="checkbox-${index}" ${task.completed ? "checked" : ""}>
                    <label for="checkbox-${index}">${task.text}</label>
                    <button class="delete-button" data-index="${index}">Delete</button>`;
                taskItem.querySelector(".delete-button").addEventListener("click", deleteTask);
                taskItem.querySelector("input[type='checkbox']").addEventListener("change", toggleTask);
                taskList.appendChild(taskItem);
            });
        }

        function deleteTask(event) {
            const index = event.target.getAttribute("data-index");
            tasks.splice(index, 1);
            updateTaskList();
            saveTasks(); // Save tasks to localStorage
        }

        function toggleTask(event) {
            const index = parseInt(event.target.getAttribute("id").split("-")[1]);
            tasks[index].completed = !tasks[index].completed;
            updateTaskList();
            saveTasks(); // Save tasks to localStorage
        }

        function printToDoList() {
            const printableList = tasks.map(task => `Task: ${task.text} | Completed: ${task.completed ? "Yes" : "No"}`).join('\n');
            const printWindow = window.open('', '', 'width=600,height=600');
            printWindow.document.open();
            printWindow.document.write('<html><head><title>To-Do List</title></head><body>');
            printWindow.document.write('<h1>To-Do List</h1>');
            printWindow.document.write(`<pre>${printableList}</pre>`);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        }

        printButton.addEventListener("click", printToDoList);

        taskInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && taskInput.value.trim() !== "") {
                addTask(taskInput.value.trim());
                taskInput.value = "";
            }
        });

        updateTaskList();


//Calendar
  const calendarFrame = document.querySelector('iframe');
  calendarFrame.addEventListener('click', () => {
    alert('Calendar clicked!');
  });

// notes
const noteInput = document.getElementById("note-input");
const saveButton = document.getElementById("save-button");
const deleteButton = document.getElementById("delete-button");
const printNotes = document.getElementById("print-button");
const notesList = document.getElementById("notes-list");

// Load saved notes from localStorage
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];

function updateNotesList() {
    notesList.innerHTML = "";
    savedNotes.forEach((note, index) => {
        const noteItem = document.createElement("div");
        noteItem.innerHTML = `
            <span>${note}</span>
            <button class="delete-note" data-index="${index}">Delete</button>
        `;
        notesList.appendChild(noteItem);
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll(".delete-note");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteNote);
    });
}

function saveNote() {
    const newNote = noteInput.value.trim();
    if (newNote !== "") {
        savedNotes.push(newNote);
        updateNotesList();
        noteInput.value = "";
        saveNotesToLocalStorage();
    }
}

function deleteNote(event) {
    const index = event.target.getAttribute("data-index");
    savedNotes.splice(index, 1);
    updateNotesList();
    saveNotesToLocalStorage();
}



function saveNotesToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(savedNotes));
}

saveButton.addEventListener("click", saveNote);

deleteButton.addEventListener("click", function() {
    savedNotes.length = 0; 
    updateNotesList();
    saveNotesToLocalStorage();
});

updateNotesList();


document.addEventListener("DOMContentLoaded", 
function () {
  // Function to fetch a new random quote
  function fetchQuote() {
      // Replace this URL with the actual Quotes API
      const apiUrl = "https://api.quotable.io";

      fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              const quoteText = data.text;
              const author = data.author;

              document.getElementById("quote-text").textContent = `"${quoteText}"`;
              document.getElementById("author").textContent = `- ${author}`;
          })
          .catch((error) => {
              console.error("Error fetching quote:", error);
          });
  }

  // Initial fetch of a quote
  fetchQuote();

  // Add an event listener to the "Get New Quote" button
  document.getElementById("new-quote-button").addEventListener("click", fetchQuote);
});




