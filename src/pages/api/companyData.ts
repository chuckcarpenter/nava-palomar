import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

// Export reusable fetch of data for use via GSSP and API path
export async function getCompanyData() {
  // Get the path to the data
  const dataDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    dataDirectory + '/companies.json',
    'utf8'
  );

  return fileContents;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const companies = await getCompanyData();
  return res.status(200).json(companies);
}
