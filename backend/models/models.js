const uuid = require('uuid')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var bcrypt = require('bcrypt');



// collection for org
const orgDataSchema = new Schema(
  {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    collection: 'org'
  }
)
const userSchema = new Schema(
  {
    _id: {type: String, required: true, default: uuid.v1},
    email: {type: String, required: true },
    passwd: {type: String, require: true},
    role: {type: String, require: true}
  }
)




// collection for clients
const clientDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      primary: {
        type: String,
        required: true
      },
      alternate: {
        type: String
      }
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String,
        required: true
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    orgs: {
      type: [{ type: String, ref: 'org' }],
      required: true,
      validate: [(org) => org.length > 0, 'needs at least one org']
    }
  },
  {
    collection: 'client',
    timestamps: true
  }
)

// collection for events
const eventDataSchema = new Schema(
  {
    _id: { type: String, default: uuid.v1 },
    org: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    services: [
      {
        type: String
      }
    ],
    date: {
      type: Date,
      required: true
    },
    address: {
      line1: {
        type: String
      },
      line2: {
        type: String
      },
      city: {
        type: String
      },
      county: {
        type: String
      },
      zip: {
        type: String
      }
    },
    description: {
      type: String
    },
    attendees: [
      {
        type: String,
        ref: 'client'
      }
    ]
  },
  {
    collection: 'event'
  }
)

 userSchema.methods.hash = function(passwd) {
  return bcrypt.hashSync(passwd, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(passwd) {
  return bcrypt.compareSync(passwd, this.passwd);
};



// collection for services
const servicesDataSchema = new Schema( //creating a new schema 
  {
    _id: { type: String, default: uuid.v1 },
    org: { 
      type: String,
      required: false // breaks application to have it as true?
    },
    name: { // name field
      type: String,
      required: true
    },
    description: { // description field
      type: String
    },
    active: // creating a status field
      {
        type: Boolean,
        //ref: 'client',
        required: true
      }
  },
  {
    collection: 'service'
  }
)


// create models from mongoose schemas
const clients = mongoose.model('client', clientDataSchema)
const orgs = mongoose.model('org', orgDataSchema)
const events = mongoose.model('event', eventDataSchema)
const users = mongoose.model('user', userSchema)
const services = mongoose.model('service', servicesDataSchema) // adding new services model

// package the models in an object to export
module.exports = { clients, orgs, events, users, services }
