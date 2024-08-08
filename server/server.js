// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;
// const host=process.env.HOST || 'localhost'

// // Middleware
// const corsOptions = {
//   origin: ['https://portfolio-shekhar-sharmas-projects-52c851c1.vercel.app'],
//   methods: ['GET,POST'],   
//   credentials: true,
// };

// app.use(cors(corsOptions));
// // app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //nodemailer

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service:'gmail',
//   port: 465,
//   secure:true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD
//     }
//     });
   


// mongoose.connect('mongodb+srv://Shekhar:Shekhar7206@cluster0.z1lxhch.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0', {
 
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });


// schema and model
// const contactSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
// });

// const Contact = mongoose.model('contacts', contactSchema);

// // Handle form submission
// app.post('/contact', async (req, res) => {
//   try {
//     const { name, email, message } = req.body;
    
//     const mailOptions = {
//       from: process.env.EMAIL ,
//       to:  shekharsharma7206@gmail.com,
//       subject: 'protfolio contact request',
//       text: `${name} want to contact with email:${email} \n message:${message} `
//       };
//     const newContact = new Contact({ name, email, message });
//    await newContact.save();
//   await transporter.sendMail(mailOptions,function(err,info){
//       if(err){
//         throw new Error("error in transpoter.sendmail")
//         }
//     });
//     res.status(201).json({ message: 'Message received' });
    
//   } catch (error) {
//     console.error('Error saving message:', error);
//     // res.status(500).json({ error: 'Error saving message' });
//      res.status(500).json({ error: error.message });
//   }
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://${host}:${port}`);
// }).on('error', (err) => {
//   if (err.code === 'EACCES') {
//     console.error(`Port ${port} requires elevated privileges`);
//   } else if (err.code === 'EADDRINUSE') {
//     console.error(`Port ${port} is already in use`);
//   } else {
//     console.error('Error starting server:', err);
//   }
// });
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const compression = require('compression');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
// app.use(cors({
//   origin: 'https://portfolio-shekhar-sharmas-projects-52c851c1.vercel.app', // Adjust this to match your frontend URL
//   methods: ['GET', 'POST'],
//   credentials: true,
// }));
app.use(cors({
  origin: 'https://portfolio-shekhar-sharmas-projects-52c851c1.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression()); // Enable Gzip compression

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Handle Form Submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'shekharsharma7206@gmail.com',
    subject: 'Portfolio Contact Request',
    text: `${name} wants to contact you.\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'An error occurred while sending your message. Please try again later.' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
