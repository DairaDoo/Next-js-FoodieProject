import { Client } from 'pg';  // Cliente para PostgreSQL
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: 'us-east-2'
});

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

client.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Connection error", err.stack));

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const res = await client.query("SELECT * FROM meals");
  return res.rows; // Retornar los datos desde PostgreSQL
}

export async function getMeal(slug) {
  const res = await client.query("SELECT * FROM meals WHERE slug = $1", [slug]);
  return res.rows[0];
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  
  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: 'dairandoo-nextjs-demo-users-image',
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  await client.query(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `,
    [meal.title, meal.summary, meal.instructions, meal.creator, meal.creator_email, meal.image, meal.slug]
  );
}
