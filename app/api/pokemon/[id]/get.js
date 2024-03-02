import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import { NotFoundError } from '@utils/response/Errors';

export async function GET(_, { params }) {
  try {
    // params gives back the id as a string, but mongodb works with ObjectIds
    const id = new ObjectId(params.id);

    const db = await getDatabase();
    const pokemon = await db.collection('pokemon').findOne({ _id: id });

    if (pokemon === null) {
      throw new NotFoundError(`Pokemon with id: ${params.id} not found.`);
    }

    return NextResponse.json(
      { ok: true, body: pokemon, error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
