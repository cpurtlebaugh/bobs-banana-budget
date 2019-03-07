import express  from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import moment from 'moment';
import { calculator } from './calculator';

// Start Banana App
const app  = express(cors());
const port = 8000;

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable cors
app.options('*', cors());

// Setup Route (traditionally this would be in it's own app dir)
app.post('/api/v1/budget', async (req, res, next) => {
    console.log("req query: ", req.body);
    
    const validStartDate = moment(new Date(req.body.startDate)).isValid();
    const invalidNumber = isNaN(parseInt(req.body.numberOfDays));
     
    if(!validStartDate || invalidNumber){
      const error = new Error('Invalid input')
      error.httpStatusCode = 400;
      return next(error);
    }

    const totalCost = await calculator(req.body.startDate, req.body.numberOfDays);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(200).send({
      success: true,
      totalCost
    });
  });

app.listen(port, () => {
  console.log('Bobs Bananas Calculator is running on: ' + port);
});
