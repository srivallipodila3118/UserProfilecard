const form = document.getElementById("profileForm");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const bio = document.getElementById("bio").value.trim();
    const image_url = document.getElementById("image_url").value.trim();

    const profileCard = document.getElementById("profileCard");

    try {
        const response = await fetch("/create-profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                bio: bio,
                image_url: image_url
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error);
        }

        profileCard.replaceChildren();

        const card = document.createElement("div");
        card.className = "profile-card";

        const image = document.createElement("img");
        image.src = result.image_url;
        image.alt = "Profile picture";

        const heading = document.createElement("h2");
        heading.textContent = result.name;

        const paragraph = document.createElement("p");
        paragraph.textContent = result.bio;

        card.append(image, heading, paragraph);
        profileCard.appendChild(card);

    } catch (error) {
        profileCard.textContent = error.message;
    }
});