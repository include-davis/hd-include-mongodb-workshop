const Trainer = {
  bsonType: 'object',
  title: 'Trainer Object Validation',
  properties: {
    _id: {
      bsonType: 'objectId',
      description: '_id must be an ObjectId',
    },
    name: {
      bsonType: 'string',
      description: 'name must be a string',
    },
  },
  additionalProperties: false,
};

export default Trainer;
