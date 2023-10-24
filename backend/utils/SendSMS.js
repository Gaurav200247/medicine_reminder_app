const twilio = require("twilio");

const phone_codes = {
  India: "+91",
};

async function SendSMS(contact_details, body) {
  const { region, phone_no } = contact_details;
  const to = `${phone_codes[region]}${phone_no}`;

  console.log({ to: to.toString() });

  const client = new twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  client.messages
    .create({
      body,
      to: to.toString(),
      from: process.env.ADMIN_PH_NO,
    })
    .then((message) => console.log({ message }))
    .catch((err) => console.log({ err }));

  client.messages
    .create({
      body,
      to: "whatsapp:" + to.toString(),
      from: process.env.ADMIN_WHATSAPP_PH_NO,
    })
    .then((message) => console.log({ message }))
    .catch((err) => console.log({ err }));
}

module.exports = SendSMS;
