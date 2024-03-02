import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function GET(_, { params }) {
  try {
    // params gives back the id as a string, but mongodb works with ObjectIds
    const id = new ObjectId(params.id);

    const db = await getDatabase();
    const trainer = await db.collection('trainers').findOne({ _id: id });

    if (trainer === null) {
      throw new NotFoundError(`Trainer with id: ${params.id} not found.`);
    }

    const pokemon = await db.collection('pokemon').find({
      trainer_id: id
    }).toArray()

    trainer["pokemon"] = pokemon

    return NextResponse.json(
      { ok: true, body: trainer, error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
