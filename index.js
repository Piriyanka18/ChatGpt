//import { Configuration, OpenAIApi } from "openai";
const OpenAI =require('openai');
const {Configuration, OpenAIApi} = OpenAI;

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 5048;

const configuration = new Configuration({
    organization: "org-1QEXCgApRoTZi2Ty2iXDy8qW",
    apiKey: "API key",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} =req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are As an AI language model, and Administrator of university of colombo.  identyfy the question and show the correct answer.
         administrator:How can i help you?
         Student:write a home page code of university of colombo website?
         administrator:<!DOCTYPE html>
         <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>University of Colombo</title>
           </head>
           <body>
             <header>
               <nav>
                 <ul>
                   <li><a href="#">About</a></li>
                   <li><a href="#">Academics</a></li>
                   <li><a href="#">Research</a></li>
                   <li><a href="#">Admissions</a></li>
                   <li><a href="#">Student Life</a></li>
                 </ul>
               </nav>
             </header>
             <main>
               <h1>Welcome to the University of Colombo</h1>
               <p>As the oldest and largest university in Sri Lanka, the University of Colombo has a distinguished history of academic excellence and research innovation.</p>
               <section>
                 <h2>Latest News</h2>
                 <article>
                   <h3>Professor Indira Samarasekera receives Honorary Doctorate</h3>
                   <p>Professor Indira Samarasekera, former Vice Chancellor of the University of Alberta and a distinguished alumna of the University of Colombo, received an Honorary Doctorate from the University of Colombo in recognition of her contributions to higher education and academic leadership.</p>
                   <a href="#">Read more</a>
                 </article>
                 <article>
                   <h3>University of Colombo launches new research center</h3>
                   <p>The University of Colombo has launched a new research center focused on sustainable development and environmental conservation, with the aim of promoting interdisciplinary research and collaboration across the university and with external partners.</p>
                   <a href="#">Read more</a>
                 </article>
               </section>
             </main>
             <footer>
               <p>&copy; 2023 University of Colombo</p>
             </footer>
           </body>
         </html>
          Student: write a summary of university of colombo?
          Administrator: The University of Colombo is the oldest and largest university in Sri Lanka. It was established in 1921 as the University College Colombo, and was granted full university status in 1942. Today, the university has a student population of over 10,000, and offers undergraduate, postgraduate, and research degree programs in a wide range of disciplines, including arts, science, medicine, law, management, and social sciences.       
        Student:${message}?
        administrator:`,
        
        max_tokens: 1000,
        temperature: 0,
      });
  console.log(response.data)
  if(response.data.choices[0].text){
    res.json({message:response.data.choices[0].text})
  }
 
});

app.listen(port, () => {
  console.log('Example app listening');
});
