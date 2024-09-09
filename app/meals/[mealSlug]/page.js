// http://localhost:3000/meals/something
// aquí el something siempre representa algo
// distinto a shares que es una ruta creada.

import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

// using metadata in dynamic functions.
export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealDeatilsPage({ params }) {
  // NexJs para unas propiedades especiales a archivos especiales (page.js, error.js, etc..)
  // en este caso parametros en key-value, en este caso mealSlug es el value.
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  const formattedInstructions = meal.instructions
    ? meal.instructions.replace(/\n/g, "<br />")
    : "No instructions available."; // Handle undefined instructions gracefully

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://dairandoo-nextjs-demo-users-image.s3.us-east-2.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: formattedInstructions,
          }}
        ></p>
      </main>
    </>
  );
}
