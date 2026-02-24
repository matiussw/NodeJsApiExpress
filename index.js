const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/hola/aprende/apis', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {console.log("Server esta arriba" + port)});

