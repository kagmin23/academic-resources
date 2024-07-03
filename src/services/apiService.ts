export const HOST_MAIN = "https://api-ojt-hcm24-react06-group04.vercel.app";

export const apiRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(`${HOST_MAIN}${url}`, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   , error);
    throw error;
  }
};
