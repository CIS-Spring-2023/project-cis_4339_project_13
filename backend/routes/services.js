const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET 10 most recent services for org
router.get('/', (req, res, next) => {
  services
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ date: 1 })
    .limit(10)
})

// GET single service by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  services.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('service not found')
    } else {
      res.json(data)
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
    case 'date':
      dbQuery.date = req.query.serviceDate
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

// GET services for which a client is signed up
router.get('/client/:id', (req, res, next) => {
  services.find({ attendees: req.params.id, org: org }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// GET org service attendance for the past two months
router.get('/attendance', (req, res, next) => {
  const twoMonthsAgo = new Date()
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)
  services
    .find({ org: org, date: { $gte: twoMonthsAgo } }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
    .sort({ date: 1 })
})

// POST new service
router.post('/', (req, res, next) => {
  const newservice = req.body
  newservice.org = org
  services.create(newservice, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT update service
router.put('/update/:id', (req, res, next) => {
  services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT add attendee to service
router.put('/register', (req, res, next) => {
  services.find(
    { _id: req.query.service, attendees: req.query.client },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        // only add attendee if not yet signed up
        if (!data.length) {
          services.findByIdAndUpdate(
            req.query.service,
            { $push: { attendees: req.query.client } },
            (error, data) => {
              if (error) {
                console.log(error)
                return next(error)
              } else {
                res.send('Client added to service')
              }
            }
          )
        } else {
          res.status(400).send('Client already added to service')
        }
      }
    }
  )
})

// PUT remove attendee from service
router.put('/deregister', (req, res, next) => {
  services.findByIdAndUpdate(
    req.query.service,
    { $pull: { attendees: req.query.client } },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
      } else {
        res.send('Client deregistered with service')
      }
    }
  )
})

// hard DELETE service by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  services.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('service not found')
    } else {
      res.send('service deleted')
    }
  })
})

module.exports = router