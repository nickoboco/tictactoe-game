
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Initialize the game board and current player
board = ["", "", "", "", "", "", "", "", ""]
current_player = "X"
game_over = False

@app.route('/')
def index():
    """Render the main game page."""
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    """Handle a player's move."""
    global board, current_player, game_over
    if game_over:
        return jsonify({"status": "game_over", "winner": check_winner(board)})

    data = request.get_json()
    cell_index = data['cell_index']

    if board[cell_index] == "":
        board[cell_index] = current_player
        winner = check_winner(board)
        if winner:
            game_over = True
            # Find the winning combination
            win_conditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
                [0, 4, 8], [2, 4, 6]              # diagonals
            ]
            winning_combination = None
            for condition in win_conditions:
                if board[condition[0]] == board[condition[1]] == board[condition[2]] != "":
                    winning_combination = condition
                    break
            response = {"status": "win", "winner": winner, "board": board, "win_combination": winning_combination}
        elif "" not in board:
            game_over = True
            response = {"status": "draw", "board": board}
        else:
            current_player = "O" if current_player == "X" else "X"
            response = {"status": "continue", "board": board, "current_player": current_player}
    else:
        response = {"status": "invalid_move", "board": board}

    return jsonify(response)

@app.route('/reset', methods=['POST'])
def reset():
    """Reset the game."""
    global board, current_player, game_over
    board = ["", "", "", "", "", "", "", "", ""]
    current_player = "X"
    game_over = False
    return jsonify({"status": "reset", "board": board, "current_player": current_player})

def check_winner(board):
    """Check if there is a winner."""
    win_conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # columns
        [0, 4, 8], [2, 4, 6]              # diagonals
    ]
    for condition in win_conditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] != "":
            return board[condition[0]]
    return None

if __name__ == '__main__':
    app.run(debug=True)
