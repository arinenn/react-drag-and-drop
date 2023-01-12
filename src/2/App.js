import { useState } from 'react';
import './App.css';

const App = () => {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'To Do',
      items: [
        { id: 1, title: 'Shopping' },
        { id: 2, title: 'Garbaging' },
        { id: 3, title: 'Writing' },
      ],
    },
    {
      id: 2,
      title: 'In Progress',
      items: [
        { id: 4, title: 'Math' },
        { id: 5, title: 'Physics' },
        { id: 6, title: 'Philosophy' },
      ],
    },
    {
      id: 3,
      title: 'Done',
      items: [
        { id: 7, title: 'Sleep' },
        { id: 8, title: 'Eat' },
        { id: 9, title: 'Dress up' },
      ],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none';
  }
  function dragOverHandler(e) {
    e.preventDefault();
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  }
  function dropHandler(e, board, item) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className !== 'item') return;
    // get index of currentItem in currentBoard (where old card is located) in order to delete it
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1); // delete it
    // get index of item in board (where we dropped new card)
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = 'none';
  }
  function dropBoardHandler(e, board) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.className !== 'board') return;
    // get index of currentItem in currentBoard (where old card is located) in order to delete it
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1); // delete it
    // add item to empty board
    board.items.push(currentItem);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = 'none';
  }

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          key={board.id}
          className="board"
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropBoardHandler(e, board)}
        >
          <div className="board-title">{board.title}</div>
          {board.items.map((item) => (
            <div
              key={item.id}
              className="item"
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
