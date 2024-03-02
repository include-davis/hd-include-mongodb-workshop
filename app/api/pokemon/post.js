import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';

import isBodyEmpty from '@utils/request/isBodyEmpty';
import { NoContentError } from '@utils/response/Errors';
import parseAndReplace from '@utils/request/parseAndReplace';

export async function POST(request) {
  try {
    // get request body from request
    const body = await request.json();

    // if body is empty, throw custom error
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    // we expect to take in an ObjectID from the body. This will convert ObjectID strings to ObjectIDs
    const parsedBody = await parseAndReplace(body);

    // get db connection
    const db = await getDatabase();

    // get the return value of the insertOne call
    const creationStatus = await db.collection('pokemon').insertOne(parsedBody);

    // get the newly created pokemon so we can return it
    // MongoDB Node driver works with ObjectIds rather than
    // strings so we must convert strings to ObjectIds
    const pokemon = await db.collection('pokemon').findOne({
      _id: new ObjectId(creationStatus.insertedId),
    });

    return NextResponse.json(
      { ok: true, body: pokemon, error: null },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, body: null, error: error.message },
      { status: error.status || 400 }
    );
  }
}
