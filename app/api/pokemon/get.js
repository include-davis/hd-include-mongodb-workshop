import { NextRequest } from 'next/server';
import getQueries from '@utils/request/getQueries';
import { getManyPokemon } from '@lib/pokemon/getPokemon';

export async function GET(request) {
  const queries = getQueries(request);
  return getManyPokemon(queries);
}
