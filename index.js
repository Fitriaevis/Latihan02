const express = require('express') // membuat variable baru dengan nama express
const app = express() // membuat variable baru dengan nama app yang isinya express
const port = 4500 // membuat variable dengan nama port yang isinya 3000

// app.get('/', (req,res)=>{
//     res.send('Halo Ini Latihan 2 Modul 9')
// })

const bodyPs = require('body-parser'); // import body-parser
app.use(bodyPs.urlencoded({ extended: false }));
app.use(bodyPs.json());


//import route posts dpi
const dpiRouter = require('./routes/dpi');
app.use('/api/dpi', dpiRouter);

//import route posts pemilik
const pemilikRouter = require('./routes/pemilik');
app.use('/api/pemilik', pemilikRouter);

//import route posts alat_tangkap
const alat_tangkapRouter = require('./routes/alat_tangkap');
app.use('/api/alat_tangkap', alat_tangkapRouter);

//import route posts kapal
const kapalRouter = require('./routes/kapal');
app.use('/api/kapal', kapalRouter);

//listen express.js kedalam port 
app.listen(port, () => {
    console.log(`aplikasi berjalan di http://localhost:${port}`)
})