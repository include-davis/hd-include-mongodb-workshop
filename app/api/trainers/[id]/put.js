import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

import { getDatabase } from '@utils/mongodb/mongoClient.mjs';
import parseAndReplace from '@utils/request/parseAndReplace';
import isBodyEmpty from '@utils/request/isBodyEmpty';
import { NoContentError, NotFoundError } from '@utils/response/Errors';

export async function PUT(request, { params }) {
  try {
    const id = new ObjectId(params.id);
    const body = await request.json();
    if (isBodyEmpty(body)) {
      throw new NoContentError();
    }

    const preparedUpdater = await parseAndReplace(body);

    const db = await getDatabase();
    const trainer = await db.collection('trainers').updateOne(
      {
        _id: id,
      },
      preparedUpdater
    );

    if (trainer.matchedCount === 0) {
      throw new NotFoundError(`Trainer with id: ${params.id} not found.`);
    }

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
