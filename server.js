import express from "express"
import cors from 'cors'
import path from "path"
import fs from 'fs';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import morgan from "morgan";
import {recipients1,recipients, recipients2, recipients4} from "./mail.js";
const filePath = path.join('data.json');

//rest object
const app = express()
const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    auth: {
      user: 'nizamudheen.tech@gmail.com',
      pass: `pboc zfzl fbob xbdb`,
    },
  });
//middlewares
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  }));
app.use(express.json())
app.use(morgan('dev'))
 
//rest api
app.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send('No data found');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Internal Server Error');
            }
        }

        // Parse and display the data
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.get('/send-whatsapp',async(req,res)=>{
    const recipient = '+91751588477'
    const sendWhatsapp = async (recipient) => {
        const message = {
            body: `Hey there! I'm a frontend developer with a strong background in React and TypeScript. Let's discuss our next steps and see if we can find a mutually beneficial solution! ��`,
            from: '+1234567890',
            to: recipient,
            type: 'whatsapp',
        }
        const response = await client.messages.create(message);
        console.log(response.sid);
        res.send('Whatsapp message sent successfully')
    }
    sendWhatsapp(recipient)
})
app.get('/mail-send',async(req,res)=>{
    const recipientCompany =['dilsha.m@coddletech.com']
    const sendEmail = async (recipient) => {
        const mailOptions = {
            from: 'nizamudheen.tech@gmail.com',
            to: recipient,
            subject: 'Opportunity to Join your team',
            html: `
            <div style="background-color: #f9f9f9; padding: 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <div style="background-color: #fff; padding: 15px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto;">
                <h2 style="color: #333; text-align: center;">Hello there!</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                I am <strong>Muhammed Nizamudheen</strong> writing to express my interest to join your team. With a strong background in both frontend and backend development, I am confident in my ability to contribute effectively to your team.! 🎉
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                My role involves creating user-friendly web applications, maintaining website functionality and security, and managing smooth deployment processes.
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Attached is my resume, which gives a detailed overview of my experience and skills. You can also check out my portfolio to see some of the projects I've worked on: 
                <a href="https://www.nizamudheen.tech/" style="color: #1a73e8;">www.nizamudheen.tech</a>.
            </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                    Looking forward to hearing from you soon!
                </p>
                <p style="color: #333; font-size: 16px;">
                    Cheers,<br>
                    Nizamudheen
                </p>
            </div>
        </div>
            `,
            attachments: [
                {
                    filename: 'resume.pdf',
                    path: path.join('.', 'resume.pdf')
                }
            ]
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                    res.send({
                        message:'could not send mail',
                    })
                } else {
                    resolve(info);
                    res.send({
                        message:'welcome to app itself working for you'
                    })
                }
            });
        });
    };
      
          await Promise.all(recipientCompany.map(recipient => sendEmail(recipient)));
    
})


app.get('/refer',async(req,res)=>{
    const recipientrefer =['']
    
    const sendEmail = async (recipient) => {
        const mailOptions = {
            from: 'nizamudheen.tech@gmail.com',
            to: recipient,
            subject: 'Could you help me to grow',
            html: `
            <div style="background-color: #f9f9f9; padding: 10px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <div style="background-color: #fff; padding: 15px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 600px; margin: auto;">
                <h2 style="color: #333; text-align: center;">Hi,</h2>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                I hope you're doing well! I'm writing to ask for your help in referring me for any suitable openings. With a strong background in both frontend and backend development, I am confident in my ability to contribute effectively to the team.
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                My experience includes creating user-friendly web applications, maintaining website functionality and security, and managing smooth deployment processes.
                </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Attached is my resume, which provides a detailed overview of my experience and skills. You can also check out my portfolio to see some of the projects I've worked on: 
                <a href="https://www.nizamudheen.tech/" style="color: #1a73e8;">www.nizamudheen.tech</a>.
            </p>
                <p style="color: #555; font-size: 16px; line-height: 1.6;">
                    I would greatly appreciate any assistance you can provide. Looking forward to hearing from you soon!
                </p>
                <p style="color: #333; font-size: 16px;">
                    Cheers,<br>
                    Nizamudheen
                </p>
            </div>
        </div>
            `,
            attachments: [
                {
                    filename: 'resume.pdf',
                    path: path.join('.', 'resume.pdf')
                }
            ]
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                    res.send({
                        message:'could not send mail',
                    })
                } else {
                    resolve(info);
                    res.send({
                        message:'welcome to app itself working for you'
                    })
                }
            });
        });
    };
      
          await Promise.all(recipientrefer.map(recipient => sendEmail(recipient)));
    
})

app.post('/whatsapp-webhook', (req, res) => {
    const data = req.body;

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Data saved successfully!');
    });
    if (data.object === 'whatsapp_business_account') {
        data.entry.forEach(entry => {
            entry.changes.forEach(change => {
                if (change.field === 'messages') {
                    const messageData = change.value.messages[0];

                    if (messageData.type === 'text') {
                        const from = messageData.from; // The sender's phone number
                        const messageBody = messageData.text.body; // The text message

                        console.log(`Message received from ${from}: ${messageBody}`);
                    }
                }
            });
        });
    }

    res.sendStatus(200);
});
//port
const PORT=process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} port ${PORT}`)
})