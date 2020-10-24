const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const port = 5000;

let records = [
  {
    id: 1,
    recordName: 'React Rave',
    artistName: 'The Developers',
    description: 'A rocking good rave',
  },
  {
    id: 2,
    recordName: 'Building an app',
    artistName: 'The Components',
    description: 'sounds of the future',
  },
];

app.get('/api/records', (req, res) => {
  res.send(records);
});

app.post('/api/records', (req, res) => {
  const newRecord = {
    id:
      records.reduce((acc, item) => {
        return item.id > acc ? item.id : acc;
      }, 0) + 1,
    ...req.body,
  };
  // records.push(newRecord);
  records = [...records, newRecord];
  console.log('new record:', newRecord);
  console.log('records:', records);

  // fs.writeFile('server.js', newRecord, () => {
  //   records = [...records, newRecord];
  // });

  res.send(newRecord);
});

app.listen(port, () => console.log(`Server listening on port 5000`));
