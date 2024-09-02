// http://localhost:3000/meals/something
// aquí el something siempre representa algo
// distinto a shares que es una ruta creada.

import Link from "next/link";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export default function MealDeatilsPage({ params }) {
  // NexJs para unas propiedades especiales a archivos especiales (page.js, error.js, etc..)
  // en este caso parametros en key-value, en este caso mealSlug es el value.
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  const formattedInstructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
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
