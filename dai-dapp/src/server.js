const path = require('path');
const express = require('exrpress');
const app = express();
const port = process.env.PORT || 3000;


const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port} ====>`);
});
