const Band = require('../models').Band
const route = require('express').Router()


route.get('/', (req, res) => {
    if (req.session.user) {
        Band.findAll({
            where: {
                userId: parseInt(req.session.user.id)
            }
        })
            .then((bands) => {
                res.status(200).send(bands);
            })
            .catch((err) => {
                console.log(err);
                req.session.user = null;
                res.status(500).send({
                    error: "some error occured"
                })
            });
    }
    else {
        res.status(500).send({
            error: "User not logged in"
        })
    }
})



route.post('/create', (req, res) => {
    console.log("in post");
    console.log(req.body);
    Band.create({
        name: req.body.name,
        userId: parseInt(req.session.user.id)
    }).then((band) => {
        res.status(201).send(band)
    }).catch((err) => {
        console.log(err);

        res.status(501).send({

            error: err.errors
        })
    })
})


route.delete('/delete', (req, res) => {
    if (req.session.user) {
        Band.destroy({
            where: {
                userId: req.session.user.id,
                name: req.body.name,
            }
        })
            .then((band) => {
                res.send("removed successfully");
            })
            .catch((err) => {
                res.send("some error occured!!!")
            })
    }
    else {
        res.status(501).send({
            error: "user not logged in"
        })
    }
})


route.patch('/edit/:bandId', (req, res) => {
    const updateOps = {};
    updateOps["name"] = req.body.name;
    Band.update(updateOps, { where: { id: req.params.bandId } })
        .then(result => {
            res.status(200).json({
                message: "band updated",
                request: {
                    type: "GET",
                    url: "http://localhost:3000/bands/" + id
                }
            });

        })
        .catch(err => {
            res.status(500).json({ error: "some error occured" });
        });
})

exports = module.exports = route
