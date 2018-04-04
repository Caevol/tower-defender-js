
Pathfinder = (function(){

    //Position
    function Position(posX, posY, endX, endY, prev, steps){
        return {
            x : posX,
            y : posY,
            steps : steps,
            distance: Math.abs(endX - posX) + Math.abs(endY - posY),
            prev: prev
        };
    }

    function compare(a, b){
        return (a.steps + a.distance) < (b.steps + b.distance)
    }

    //A* implementation to find path from [startX, startY] to [endX, endY] using the board
    function getPath(startX, startY, endX, endY, board){
        let posHeap = new PriorityQueue(compare);
        let visitedPositions = new Map();
        let finalPos = null;

        posHeap.push(Position(startX, startY, endX, endY, null, 0));
        visitedPositions.set(startY * board.length + startX, true);

        let searchComplete = false;

        while(!posHeap.isEmpty() && !searchComplete) {
            let pos = posHeap.pop();

            if(pos.x == endX && pos.y == endY){
                searchComplete = true;
                finalPos = pos;
                break;
            }


            addPaths(posHeap, visitedPositions, pos, board, endX, endY);

        }

        if (searchComplete == false){
            return null;
        }

        revPos = finalPos; //reverse path
        revPos.nxt = null;
        while(revPos.prev !== null){
            revPos.prev.nxt = revPos;
            revPos = revPos.prev;
            delete revPos.nxt.prev;
        }
        delete revPos.prev;


        return revPos;

    }

    function addPaths(posHeap, visitedPositions, pos, board, endX, endY){
        //addPath(posHeap, visitedPositions, pos, -1, -1, 1.2, board, endX, endY);
        addPath(posHeap, visitedPositions, pos, 0, -1, 1, board, endX, endY);
        //addPath(posHeap, visitedPositions, pos, 1, -1, 1.2, board, endX, endY);
        addPath(posHeap, visitedPositions, pos, -1, 0, 1, board, endX, endY);
        addPath(posHeap, visitedPositions, pos, 1, 0, 1, board, endX, endY);
        //addPath(posHeap, visitedPositions, pos, -1, 1, 1.2, board, endX, endY);
        addPath(posHeap, visitedPositions, pos, 0, 1, 1, board, endX, endY);
        //addPath(posHeap, visitedPositions, pos, 1, 1, 1.2, board, endX, endY);
    }

    function addPath(posHeap, visitedPositions, pos, offX, offY, stepOffset, board, endX, endY){
        if(pos.x + offX > board[0].length - 1 || pos.x + offX < 0 || pos.y + offY < 0 || pos.y + offY > board.length - 1) {
            return;
        }

        let boardPosition = (pos.y + offY) * board.length + (pos.x + offX);

        if(!visitedPositions.has(boardPosition)
            && board[pos.y + offY][pos.x + offX].occupied === false) {
            posHeap.push(Position(pos.x + offX, pos.y + offY, endX, endY, pos, pos.steps + stepOffset));
            visitedPositions.set((pos.y + offY) * board.length + (pos.x + offX), true);
        }
    }

    return {
        getPath : getPath
    };

}());