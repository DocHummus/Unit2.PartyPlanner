const app = document.getElementById("app");
const submit = document.getElementById("submit");

//add function
const addEvent = async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;
  const dateIso = new Date(date).toISOString();

  const obj = {
    name,
    date: dateIso,
    location,
    description,
  };

  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-fsa-et-web-ft-sf/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    const result = await response.json();
    div = makeList(result.data);
    app.appendChild(div);
  } catch (error) {
    console.error("Error:", error);
  }
};

submit.addEventListener("click", addEvent);

//delete function
const deleteEvent = async (e) => {
  const event_id = e.target.id;
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-fsa-et-web-ft-sf/events/${event_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const element = document.getElementById(event_id);
    element.remove();
  } catch (error) {
    console.error("Error:", error);
  }
};

const makeList = (element) => {
  const div = document.createElement("div");
  div.id = element.id;
  div.style.margin = "5%";

  const pName = document.createElement("p");
  pName.innerHTML = `Name: ${element.name}`;
  div.appendChild(pName);

  const pDate = document.createElement("p");
  pDate.innerHTML = `Date: ${element.date}`;
  div.appendChild(pDate);

  const pLocation = document.createElement("p");
  pLocation.innerHTML = `Location: ${element.location}`;
  div.appendChild(pLocation);

  const pDescription = document.createElement("p");
  pDescription.innerHTML = `Description: ${element.description}`;
  div.appendChild(pDescription);

  const button = document.createElement("button");
  button.innerHTML = "Delete";
  button.id = element.id;
  button.addEventListener("click", deleteEvent);
  div.appendChild(button);

  return div;
};

const render = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2311-fsa-et-web-ft-sf/events",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    result.data.forEach((element) => {
      div = makeList(element);

      app.appendChild(div);
    });
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

render();
