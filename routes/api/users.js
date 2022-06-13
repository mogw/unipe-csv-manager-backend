const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')

router.get('/',  function(req, res){
    User.find({}, function(err, users) {
        res.json({
          success: true,
          users: users
        })
    })
})

router.delete('/:id', function (req, res) {
    User.deleteOne({ _id: req.params["id"]})
        .then(function (result) {
            if (result.deletedCount === 0) {
                res.status(404).send({
                    success: false,
                    message: "Not found entry"
                })
            } else {
                res.send({
                    success: true,
                    message: "Successfully removed"
                })
            }
        })
        .catch(function (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                message: "Internal Server Error",
            })
        })
})

router.put('/:id', function (req, res) {
    const userRequest = {
       name: req.body["name"],
       age: req.body["age"],
       sex: req.body["sex"],
    }

    User.updateOne({_id: req.params["id"]}, userRequest)
        .then(function(result) {
            if (result.matchedCount) {
                res.send({
                    success: true,
                    message: "Successfully updated",
                })
            } else {
                res.status(404).send({
                    success: true,
                    message: "Not found entry"
                })
            }

        })
        .catch(function (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                message: "Internal Server Error",
            })
        })
})

module.exports = router
