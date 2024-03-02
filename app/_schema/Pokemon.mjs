const Pokemon = {
  bsonType: 'object',
  title: 'Pokemon Object Validation',
  properties: {
    _id: {
      bsonType: 'objectId',
      description: '_id must be an ObjectId',
    },
    name: {
      bsonType: 'string',
      description: 'name must be a string',
    },
    happiness: {
      bsonType: 'number',
      description: 'happiness must be a number',
    },
    trainer_id: {
      bsonType: 'objectId',
      description: 'trainer_id must be an ObjectId',
    },
  },
  additionalProperties: false,
};

export default Pokemon;
