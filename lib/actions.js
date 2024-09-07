"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || typeof text !== "string" || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"), // Assuming this is a File/Blob
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // Validate fields
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  // Save the new meal in the database
  await saveMeal(meal);

  // Immediately revalidate the meals page cache
  revalidatePath("/meals"); // This ensures the cache is cleared and updated for the /meals path

  // Redirect to the meals page
  redirect("/meals");
}
