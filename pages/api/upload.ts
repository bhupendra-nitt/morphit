import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { parseFile } from '../../lib/fileParser';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'uploads');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Ensure upload directory exists
  try {
    await fs.access(uploadDir);
  } catch (error) {
    await fs.mkdir(uploadDir, { recursive: true });
    console.log(`Created upload directory: ${uploadDir}`);
  }

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 10000 * 1024 * 1024, // 10MB limit
  });

  try {
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (Array.isArray(file)) {
      return res.status(400).json({ error: 'Multiple files uploaded. Please upload only one file.' });
    }

    const filePath = file.filepath;
    const fileName = file.originalFilename || 'unknown';

    if (!filePath) {
      return res.status(500).json({ error: 'File path is undefined' });
    }

    console.log(`File uploaded: ${fileName}`);
    console.log(`Stored at: ${filePath}`);

    // Parse the file
    const parsedData = await parseFile(filePath, path.extname(fileName));

    res.status(200).json({ 
      message: 'File uploaded and parsed successfully', 
      fileName, 
      columns: Object.keys(parsedData[0]),
      rowCount: parsedData.length
    });
  } catch (error) {
    console.error('Upload error:', error);
    // @ts-ignore
    res.status(500).json({ error: 'Failed to upload and process file', details: error.message });
  }
};

export default handler;