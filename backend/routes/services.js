const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET 10 most recent services
router.get('/', (req, res, next) => {
  services
    .find({ orgs: org}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ name: 1 })
    .limit(10)
})
router.get('/:id', (req, res, next) => {
  services.find({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      return res.json(data)
    }
  })
})
// GET services based on search query
// Ex: '...?name=Food&searchBy=name'
router.get('/search/', (req, res, next) => {
  const dbQuery = { org: org }
  switch (req.query.searchBy) {
    case 'name':
      // match service name, no anchor
      dbQuery.name = { $regex: `${req.query.name}`, $options: 'i' }
      break
    case 'active':
      dbQuery.active = req.query.servicesActive
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  services.find(dbQuery, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// POST new service 
router.post('/', (req, res, next) => {
  const newService = req.body
  console.log(newService)
  newService.org = org
  services.create(newService, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT update service
router.put('/update/:id', (req, res, next) => {
  console.log(req.params.id, req.body)
  services.findByIdAndUpdate(req.body._id, {name: req.body.name, description: req.body.description, active: req.body.active}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// hard DELETE service by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  services.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service Not Found')
    } else {
      res.send('Service Deleted')
    }
  })
})


module.exports = router