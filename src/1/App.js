import { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 1, text: 'CARD 1' },
    { id: 2, order: 2, text: 'CARD 2' },
    { id: 3, order: 3, text: 'CARD 3' },
    { id: 4, order: 4, text: 'CARD 4' },
  ]);
  const [currentCard, setCurrentCard] = useState(null);

  // drag and drop handlers
  function dragStartHandler(e, card) {
    console.log('drag', card);
    setCurrentCard(card);
  }
  function dragLeaveHandler(e) {
    console.log('leave');
    e.target.style.background = 'white';
  }
  function dragEndHandler(e) {
    console.log('end');
    e.target.style.background = 'white';
  }
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgray';
  }
  function dropHandler(e, card) {
    console.log('drop', card);
    e.preventDefault();
    e.target.style.background = 'white';
    setCurrentCard(card);
    // sort cardList, change order of cards (swap them)
    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order };
        } else if (c.id === currentCard.id) {
          return { ...c, order: card.order };
        } else {
          return c;
        }
      })
    );
  }

  function sortCards(a, b) {
    // sort our cards by order
    return a.order > b.order ? 1 : -1;
  }

  // onDragStart, onDragLeave, onDragEnd, onDragOver, onDrop
  // 1. taking the element
  // 2. leaving the element
  // 3. stop grabbing
  // 4. positioning on different element
  // 5. drop element

  return (
    <div className="App">
      {cardList.sort(sortCards).map((card) => (
        <div
          key={card.id}
          className="card"
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      ))}
    </div>
  );
}

export default App;
