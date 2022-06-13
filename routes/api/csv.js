const mongoose = require('mongoose')
const router = require('express').Router()
const multer = require('multer')
const csv = require('fast-csv')
const fs = require('fs');
const upload = multer({ dest: 'tmp/csv/' })

const User = mongoose.model('User')

router.post('/upload',  upload.single('file'), function(req, res){
    const users = [];

    csv.parseFile(req.file.path, { headers: true })
        .on('error', function (error) {
            console.log(error)
            res.status(400).send({
              success: false,
              message: "Bad request"
            })
        })
        .on("data", function (data) {
            users.push({
                name: data.name,
                age: data.age,
                sex: data.sex,
            });
        })
        .on("end", function () {
            fs.unlinkSync(req.file.path);   // remove temp file

            // Remove all rows and insert new rows
            User.remove({})
                .then(function () {
                    User.insertMany(users)
                        .then(function() {
                            res.send({
                                success: true,
                                message: "Successfully uploaded",
                            })
                        })
                        .catch(function (error) {
                            console.log(error)
                            res.status(500).send({
                                success: false,
                                message: "Something went wrong"
                            })
                        })
                })
                .catch(function (error) {
                    console.log(error)
                    res.status(500).send({
                        success: false,
                        message: "Something went wrong"
                    })
                })
        })
})

module.exports = router
