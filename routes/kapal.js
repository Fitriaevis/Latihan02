const express = require('express');
const router = express.Router();

//import express-validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/db');

//function Create data
router.post('/create', [
    //validation
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap
    }
    connection.query('INSERT INTO kapal SET ?', Data, function(err, rows){
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Create Data Success...',
                data: rows[0]
            })
        }
    })
})

// Function Read all data
router.get('/', function (req, res) {
    connection.query(' SELECT a.nama_kapal AS nama_kapal, ' +
    ' b.nama_pemilik AS nama_pemilik, ' +
    ' c.luas AS luas, ' +
    ' d.nama_alat_tangkap AS nama_alat_tangkap ' +
    ' FROM kapal a ' +
    ' JOIN pemilik b ON b.id_pemilik = a.id_pemilik ' +
    ' JOIN dpi c ON c.id_dpi = a.id_dpi ' +
    ' JOIN alat_tangkap d ON a.id_alat_tangkap = d.id_alat_tangkap ' +
    ' ORDER BY a.id_kapal DESC ', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
            status: true,
            message: 'Data Kapal',
            data: rows,
            });
        }
    });
});

//function Update data
router.patch('/update/:id', [
    //validation
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap
    }
    connection.query(`UPDATE kapal SET ? WHERE id_kapal = ${id}`, Data, function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Success..!',
                data: rows[0]
            })
        }
    })
})

//function Delete data
router.delete('/delete/:id', function(req, res){
    let id = req.params.id;
    connection.query(`DELETE FROM kapal WHERE id_kapal = ${id}`,  function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Success..!',
            })
        }
    })
})

//function Search data by id_dpi
router.get('/search/:id', function (req, res){
    let id = req.params.id;
    connection.query(` SELECT a.nama_kapal AS nama_kapal,
    b.nama_pemilik AS nama_pemilik, 
    c.luas AS luas, 
    d.nama_alat_tangkap AS nama_alat_tangkap 
    FROM kapal a 
    JOIN pemilik b ON b.id_pemilik = a.id_pemilik 
    JOIN dpi c ON c.id_dpi = a.id_dpi 
    JOIN alat_tangkap d ON a.id_alat_tangkap = d.id_alat_tangkap 
    WHERE id_kapal = ${id}`, function(err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data Kapal',
                data: rows[0]
            })
        }
    })
})

module.exports = router;
