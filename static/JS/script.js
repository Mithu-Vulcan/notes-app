function addNote () {
    let noteInput = document.getElementById("noteInput")
    let noteText = noteInput.value
    console.log(noteText)
    fetch ("/add_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({note: noteText})
    })
    .then(() => fetchNotes())
}

function displayNotes(notes) {
    let noteList = document.getElementById("noteList")
    noteList.innerHTML = ""
    notes.forEach(note => {
        let div = document.createElement("div")
        div.classList.add("list-div")
        let btn = document.createElement("button")
        btn.classList.add("delete-button")
        btn.textContent = "Delete"
        btn.addEventListener("click", function () {deleteNote(note)})
        let p = document.createElement("p")
        p.classList.add("list-item")
        p.innerHTML = `${note}`
        div.appendChild(p)
        div.appendChild(btn)
        noteList.appendChild(div)
    })
}

function fetchNotes() {
    fetch ("/get_notes")
    .then(response => response.json())
    .then(data => displayNotes(data.notes))
}

function deleteNote(note_to_delete) {
    fetch ("/delete_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({note: note_to_delete})
    })
    .then(response => response.json())
    .then(data => fetchNotes())
}