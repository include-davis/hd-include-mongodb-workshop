import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';

import isBodyEmpty from '@utils/request/isBodyEmpty';
import { NoContentError } from '@utils/response/Errors';

export async function POST(request) {
  try {
    // get request body from request
    const body = await request.json();

    // if body is empty, throw custom error
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    // get db connection
    const db = await getDatabase();

    // get the return value of the insertOne call
    const creationStatus = await db.collection('trainers').insertOne(body);

    // get the newly created trainer so we can return it
    // MongoDB Node driver works with ObjectIds rather than
    // strings so we must convert strings to ObjectIds
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
