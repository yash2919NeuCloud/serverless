const Mailgun = require('mailgun.js');
const formData = require('form-data');
const { User } = require('./sqlsetup'); 
require('dotenv').config();
const mailgunFormData = new Mailgun(formData);
const mailgunClient = mailgunFormData.client({
  username: 'api',
  key:  process.env.key,
});


exports.helloPubSub = async (event, context) => {
  try {
       const pubsubMessage = event.data;
    const userData = JSON.parse(Buffer.from(pubsubMessage, 'base64').toString());

    const  username = userData.username;
    const id = userData.id;
    const user = await User.findOne({ where: { username } });
const currentTime = new Date();
user.timestamp = currentTime;

const twoMinutesLater = new Date(currentTime.getTime() + 2 * 60 * 1000);
user.exptimestamp = twoMinutesLater;
console.log("Current time:", currentTime);
console.log("Current time + 2 minutes:", twoMinutesLater);
    await user.save();
console.log("1", user.timestamp );
console.log( "2",user.exptimestamp );

    const emailData = {
        from: 'Yash <mailgun@yashnahata.me>',
        to: [username],
        subject: 'Email Verification',
        text: `Please click on the link to verify your email:  https://yashnahata.me:443/v1/user/verify?id=${id}`,
    };


    const response = await mailgunClient.messages.create('yashnahata.me', emailData);
    console.log('Email sent:', response);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

