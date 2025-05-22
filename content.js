//Logic: 
// 1. Wait for user to release mouse
// 2. if text selected , show the button to save to sheet
// 3.when clicked , collect the desired data and send it

let saveButton = null;

document.addEventListener("mouseup", (e) => {
  const textSelected = window.getSelection().toString().trim();

  //Preventing creating button if click was on the existing button
  if (e.target === saveButton) return;

  // Remove old button if it exists
  if (saveButton) {
    saveButton.remove();
    saveButton = null;
  }

  if (textSelected.length > 0) {
    saveButton = document.createElement("button");
    saveButton.innerText = 'Save to Sheet!';

    saveButton.style.position = "absolute";
    saveButton.style.top = `${e.pageY}px`;
    saveButton.style.left = `${e.pageX}px`;
    saveButton.style.zIndex = 9999;
    saveButton.style.padding = "8px 12px";
    saveButton.style.backgroundColor = "#007bff";
    saveButton.style.color = "#fff";
    saveButton.style.border = "none";
    saveButton.style.borderRadius = "4px";
    saveButton.style.cursor = "pointer";
    saveButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    document.body.appendChild(saveButton);

    saveButton.addEventListener('click', async () => {
      const metadata = {
        text: textSelected,
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
      console.log("Sending Data:", metadata);

      try {
        await fetch("https://script.google.com/macros/s/AKfycbzjDGnLsmN_MjoxTTRFQoL5FBs2p8TESNA8iDVZe5gPSXPDQLCSNxZL_mrrgblNwZDmXA/exec", {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(metadata)
        });
      
        alert("Clicked to save. Data sent (check sheet after 5 seconds)");
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to send data.");
      }
      

      console.log('Your Data:', metadata);
      saveButton.remove();
      saveButton = null;
    });
  }
});
