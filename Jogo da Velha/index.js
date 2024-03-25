const player_X = 'x'
const player_O = 'circulo'
const way_winning = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
const celulaElements = document.querySelectorAll('[data-celula]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	celulaElements.forEach(celula => {
		celula.classList.remove(player_X)
		celula.classList.remove(player_O)
		celula.removeEventListener('click', handleCellClick)
		celula.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
	const celula = e.target
	const currentClass = isPlayer_O_Turn ? player_O : player_X
	placeMark(celula, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(empate) {
    if (empate) {
        winningMessageTextElement.innerText = "Isso é um empate!"
    } else {
        winningMessageTextElement.innerText = 'Player ${isPlayer_O_Turn ? "O" : "X"} venceu'
    }
}

function isDraw(){
    return [...celulaElements].every(celula => {
        return celula.classList.contains(player_X) || celula.classList.contains(player_O)
    })
}

function placeMark(celula, currentClass) {
    celula.classList.add(currentClass)
}

function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	boardElement.classList.remove(player_X)
	boardElement.classList.remove(player_O)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(player_O)
	} else {
		boardElement.classList.add(player_X)
	}
}

function checkWin(currentClass) {
	return way_winning.some(combination => {
		return combination.every(index => {
			return celulaElements[index].classList.contains(currentClass)
		})
	})
}