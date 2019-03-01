import express  from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import { calculator } from './calculator';

// Start Banana App
const app  = express();
const port = 8000;

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Route (traditionally this would be in it's own app dir)
app.get('/api/v1/budget', async (req, res, next) => {
    const validStartDate = moment(new Date(req.body.startDate));
    const invalidNumber = isNaN(parseInt(req.body.numberOfDays));

    if(!validStartDate.isValid() || invalidNumber){
      const error = new Error('Invalid input')
      error.httpStatusCode = 400;
      return next(error);
    }

    const totalCost = await calculator(req.body.startDate, req.body.numberOfDays);

    res.status(200).send({
      success: 'True',
      totalCost
    });
  });

app.listen(port, () => {
  console.log('Bobs Bananas Calculator is running on: ' + port);
});
