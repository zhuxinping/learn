const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.listen(8081);
const arr = [];
for(let i = 1;i<7;i++){
    arr.push(`http://localhost:3000/images/${i}.png`)
}
app.get('/api/img',(req,res)=>{
    res.json(arr);
});