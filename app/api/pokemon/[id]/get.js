import { getPokemon } from '@lib/pokemon/getPokemon';

export async function GET(_, { params }) {
  return getPokemon(params.id);
}
