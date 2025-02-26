export async function actionsErrorsWrapper(func: any) {
  try {
    return await func();
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: `An unexpected error occurred ${error}`,
    };
  }
}
