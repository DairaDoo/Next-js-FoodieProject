import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || typeof text !== 'string' || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),  // image is a File or Blob
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  // Check only the text fields with isInvalidText
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||  // this was incorrectly meal.name
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image || // additional check to make sure image is provided
    meal.image.size === 0 // ensure image has content
  ) {
    return {
      message: "Invalid input."
    };
  }

  await saveMeal(meal);
  redirect("/meals"); // redirect user to meals page
}
