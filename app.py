from flask import Flask, render_template, request
import uuid

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/create-profile", methods=["POST"])
def create_profile():

    name = request.form.get("name")
    bio = request.form.get("bio")
    image_url = request.form.get("image_url")

    if not name or not bio or not image_url:
        return "All fields are required!", 400

    profile_id = "USR-" + uuid.uuid4().hex[:8].upper()

    return render_template(
        "profile.html",
        profile_id=profile_id,
        name=name,
        bio=bio,
        image_url=image_url
    )

if __name__ == "__main__":
    app.run(debug=True)