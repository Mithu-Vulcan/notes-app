from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

notes = []

@app.route("/")
def main():
    return render_template("index.html")


@app.route("/add_note", methods=["POST", "GET"])
def add_note():
    note = request.json
    notes.append(note["note"])
    print(notes)
    return "hello"

@app.route("/get_notes")
def get_notes():
    print("got request")
    return jsonify({"notes": notes})

@app.route("/delete_note", methods=["POST"])
def delete_notes():
    data = request.json
    note = data["note"]
    print("got request delete note: " + note)
    if note in notes:
        notes.remove(note)
    return jsonify({"notes": notes})


if __name__ == "__main__":
    app.run(debug=True)