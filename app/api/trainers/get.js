import { NextResponse } from 'next/server';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import getQueries from '@utils/request/getQueries';

export async function GET(request) {
  try {
    // takes a NextResponse object and gives back the queries in key value pairs (JSON)
    const queries = getQueries(request);

    // get database connection instance
    const db = await getDatabase();

    // Make sure to use .toArray() at the end when expecting a list of object from mongodb
    const trainers = await db
      .collection('trainers')
      .aggregate([
        { $match: queries },
        {
          $lookup: {
            from: 'pokemon',
            localField: '_id',
            foreignField: 'trainer_id',
            as: 'pokemon',
          },
        },
      ])
      .toArray();

    return NextResponse.json(
      { ok: true, body: trainers, error: null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
