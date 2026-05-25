export async function getInstructorCourses() {
  try {
    const res = await fetch("http://localhost:3000/api/instructor/courses", {
      cache: "no-store",
    });

    const data = await res.json();

    return data.courses || [];
  } catch (error) {
    console.log(error);

    return [];
  }
}
