import React, { useState, useEffect } from "react";
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items fucnction
  const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="https://media.istockphoto.com/id/1011182136/photo/check-off-completed-tasks-on-a-to-do-list.jpg?s=1024x1024&w=is&k=20&c=lH8QAB4K7Fi0cAs_I9av6kK1gtPIbvrlHKBT7ZVA-GI=" />
            <figcaption>Add Your List Here 👇🏻</figcaption>
          </figure>
          <div className="addItems">
            <div style={{ height: '60px' }}>
              <input
                type="text"
                placeholder="✍🏼 Add Item"
                className="form-control"
                value={inputdata}
                onChange={(event) => setInputData(event.target.value)}
              />
            </div>

            {/* <div> */}
            <span>
              {toggleButton ? (
                <EditIcon className="addicon" onClick={addItem}></EditIcon>

              ) : (
                <AddIcon className="addicon" onClick={addItem} fontSize="large" ></AddIcon>

              )}
              {/* </div> */}
            </span>

          </div>
          {/* show our items  */}
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">

                    <EditIcon onClick={() => editItem(curElem.id)}></EditIcon>

                    <DeleteIcon onClick={() => deleteItem(curElem.id)}></DeleteIcon>
                  </div>
                </div>
              );
            })}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">

            <Button variant="contained" className="btn" sx={{ margin: '20px' }} color="error" onClick={removeAll}>ClaearAll</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;


