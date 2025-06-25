document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      const tokenRes = await fetch("cennik_files/token.txt");
      const token = await tokenRes.text();
      const webhookUrl = "https://discord.com/api/webhooks/1387355277153665025/" + token.trim();

      const payload = {
        content: "**Nowe zapytanie ze strony iSano:**",
        embeds: [
          {
            color: 5814783,
            fields: [
              { name: "👤 Imię i Nazwisko", value: name || "Brak", inline: false },
              { name: "📞 Numer telefonu", value: phone || "Brak", inline: false },
              { name: "📧 Adres e-mail", value: email || "Brak", inline: false },
              { name: "📝 Treść pytania", value: message || "Brak", inline: false }
            ],
            footer: {
              text: "Wysłane z formularza iSano"
            },
            timestamp: new Date().toISOString()
          }
        ]
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      status.textContent = "Wiadomość została wysłana!";
      form.reset();
    } catch (err) {
      status.textContent = "Wystąpił błąd. Spróbuj ponownie później.";
      console.error(err);
    }
  });
});