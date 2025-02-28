import type {NextApiRequest, NextApiResponse} from 'next';
import fs from 'fs';

const GENERATED_PATH = './subgraphs/punks/generated/schema.ts';

export default async function entity(
  _req: NextApiRequest,
  res: NextApiResponse<boolean | string>,
) {
  try {
    let generatedSchema = fs.readFileSync(GENERATED_PATH, 'utf8');
    // better to use a regex, need some regex expert here!
    // to make the code more robust, but it's working as is.
    let entities = generatedSchema
      .split(/\r?\n/)
      .filter((line) => {
        return line.trim().slice(0, 6) === 'export';
      })
      .map((words) => words.split(' ')[2])
      .sort();

    if (entities.length != 2) {
      throw new Error('Too much entities');
    }

    if (!(entities[0] === 'Account')) {
      throw new Error('Account entity is missing');
    }

    if (!(entities[1] === 'Punk')) {
      throw new Error('Punk entity is missing');
    }
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
