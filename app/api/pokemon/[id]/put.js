import { updatePokemon } from '@lib/pokemon/updatePokemon';
import { NextRequest } from 'next/server';

export async function PUT(
  request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  return updatePokemon(params.id, body);
}
