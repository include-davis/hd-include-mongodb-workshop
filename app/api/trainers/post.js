import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';

import isBodyEmpty from '@utils/request/isBodyEmpty';
import { NoContentError } from '@utils/response/Errors';

export async function POST(request) {
  try {
    const body = await request.json();
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const db = await getDatabase();
    const creationStatus = await db.collection('trainers').insertOne(body);

    const trainer = await db.collection('trainers').findOne({
      _id: new ObjectId(creationStatus.insertedId),
    });

    return NextResponse.json(
      { ok: true, body: trainer, error: null },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
