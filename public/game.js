export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const playerX = command.playerX
        const playerY = command.playerY

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function addFruit(command) {
        const fruitId = command.fruitId
        const fruitX = command.fruitX
        const fruitY = command.fruitY

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }
    
    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function removePlayer(command){
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptMoves = {
            ArrowUp(player) {
                if (player.y -1 >= 0){
                    player.y = player.y - 1
                }
            },                        
            
            ArrowDown(player) {
                if (player.y + 1 < state.screen.width){
                    player.y = player.y + 1
                }                        
            },
            ArrowRight(player) {
                if (player.x + 1 < state.screen.width){
                    player.x = player.x + 1
                }                        
            },
            ArrowLeft(player) {
                if (player.x - 1 >= 0){
                    player.x = player.x - 1 
                }                        
            }
        }

        const keyPressed = command.keyPressed
        const player = state.players[command.playerId]
        const playerId = command.playerId
        const moveFunction = acceptMoves[keyPressed]

        if (player && moveFunction) { 
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId]

        for (const fruitId in state.fruits) {
            const fruit =  state.fruits[fruitId]
            
            if (player.x === fruit.x && player.y === fruit.y){
                console.log("COLLISION DETECTED!!!")
                removeFruit({fruitId: fruitId})
            }
        }                    
    
    }

    return {
        movePlayer,
        state,
        addPlayer,
        addFruit,
        removePlayer,
        removeFruit
    }
}