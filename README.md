# Simple Web-Based Tic Tac Toe Game

This is a simple web-based Tic Tac Toe game built with Python using the Flask framework for the backend and HTML, CSS, and JavaScript for the frontend.

## Features

*   Classic 3x3 Tic Tac Toe board.
*   Players take turns placing 'X' and 'O'.
*   Detects win conditions (rows, columns, diagonals).
*   Detects a draw when the board is full.
*   Reset button to start a new game.
*   Visual indication (a line) when a player wins.

## Setup and Installation

1.  **Clone the repository (if applicable) or ensure you have the project files.**
2.  **Install Python:** If you don't have Python installed, download it from [python.org](https://www.python.org/).
3.  **Install Flask:** Open your terminal or command prompt and run:
    ```bash
    pip install Flask
    ```

## How to Run

1.  **Navigate to the project directory:** Open your terminal or command prompt and change your current directory to the `c:\tictactoe` folder where you saved the project files.
    ```bash
    cd c:\\tictactoe
    ```
2.  **Run the Flask application:** Execute the following command:
    ```bash
    python app.py
    ```
3.  **Open in browser:** Open your web browser and go to `http://127.0.0.1:5000/`.

## Project Structure

```
.
├── app.py          # Flask backend application
├── README.md       # Project explanation
├── static/
│   ├── script.js   # Frontend JavaScript for game logic and interaction
│   └── style.css   # Frontend CSS for styling
└── templates/
    └── index.html  # Frontend HTML for the game interface
```

## Technologies Used

*   **Backend:** Python, Flask
*   **Frontend:** HTML, CSS, JavaScript

Enjoy playing Tic Tac Toe!
