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

export default async function MealDetailsPage({ params }) {
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
            layout="fill" // Usa fill para hacer la imagen responsiva
            objectFit="cover" // Mantiene la proporción de la imagen y cubre el área
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
