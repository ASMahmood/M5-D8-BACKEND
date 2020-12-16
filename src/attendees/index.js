const express = require("express");
const { getAttendees, writeAttendees } = require("../fsUtilities.js");
const uniqid = require("uniqid");
const sgMail = require("@sendgrid/mail");

const attendeesRouter = express.Router();

attendeesRouter.post("/", async (req, res, next) => {
  try {
    const attDB = await getAttendees();

    attDB.push({
      ...req.body,
      ID: uniqid(),
    });
    await writeAttendees(attDB);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    console.log(sgMail);

    const msg = {
      to: "abdul_mahmood@hotmail.co.uk",
      from: "abdul_mahmood@hotmail.co.uk",
      subject: "You Suck!",
      text: "and everybody knows it!",
      html: "<strong>and everybody knows it!</strong>",
    };

    await sgMail.send(msg);
    res.send("EMAIL SENT!");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = attendeesRouter;
