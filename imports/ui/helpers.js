export const insertItem = (event, db) => {
    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    db.insert({
        text,
        createdAt: new Date(),
    });
    // Clear form
    return target.text.value = '';
}

export const deleteItem = (db, id) => {
    console.log("deleted with id", id);
    db.remove(id)
}

export const setItemDone = (db, item) => {
   const newItem = {
       text:item.text,
       createdAt:item.createdAt,
       checked:!item.checked
   }
   db.update(item._id, newItem)
}

export const editItem = (event, db, item ) => {
    const target = event.target;
    const text = target.value
    const editedItem = {
        text: text,
        createdAt: item.createdAt,
        checked:item.checked  
    }
    db.update(item._id, editedItem)
}

