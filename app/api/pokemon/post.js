import { NextRequest } from 'next/server';
import { createPokemon } from '@lib/pokemon/createPokemon';

export async function POST(request) {
  const body = await request.json();
  return createPokemon(body);
}
