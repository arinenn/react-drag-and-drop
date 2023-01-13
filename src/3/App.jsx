import React, { useState } from 'react';
import { finalSpaceCharacters } from './consts';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import './App.css';

// 1. DragDropContext gives the ability to use the library
// works similarly to React Context API:
// library can now have access to the component tree

// 2. Droppable area allows us to provide a specific area
// where our items can moved around inside;
// droppableId allows the library to keep track of this
// specific instance between interactions

// 3. provided argument includes information and references
// to a code that the library needs to work properly;
// we can use it by
// <ul className="characters"
//   {...provided.droppableProps }
//   ref = { provided.innerRef }
// >

// 4. Draggable includes a function where we'll pass through props
// to our list item components;
// we will make our list elements draggable and droppable by
// wrapping each list item with a component similar to what
// we jst did with the entire list

// 5. These steps make our items draggable and droppable;
// now we need to add a placeholder item at the bottom of <ul></ul>

// 6. To make our components land on new place we will use onDragEnd prop
// of DragDropContext

const App = () => {
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleDragEnd = (result) => {
    // result - is an object with DragDrop custom fields
    // in result.destination located the index and draggableId of Draggable DESTINATION element
    // in result.source located the index and draggableId of Draggable SOURCE element
    console.log(result);
    // update the array
    if (!result.destination) return; // fix error on 55 row
    const src = result.source.index;
    const dest = result.destination.index;
    const items = Array.from(characters); // copy characters
    const [reorderedItem] = items.splice(src, 1); // memorize result item
    items.splice(dest, 0, reorderedItem);
    setCharacters(items);
    // but now we have an error if draggind out of bounds
    // because when we drop out we don't have a destination
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="characters">
        {(provided) => (
          <ul
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {characters.map(({ id, name, thumb }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div className="characters-thumb">
                      <img src={thumb} alt={`${name} thumbnail`} />
                    </div>
                    <p className="characters-name">{name}</p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
