export interface requestInputType {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: string
  headers?: HeadersInit
}

/**
 * This is the main function which makes all the api calls
 * @param url - The url to be called
 * @param method - The method to be used
 * @param body - The body to be sent
 * @returns - The response from the server
 */
export const globalFetch = async <T>({
  method = 'GET',
  url,
  body,
  headers = {
    'Content-Type': 'application/json',
  },
}: requestInputType): Promise<T> => {
  /**
   * we are using react query for this project and it is essential to return promise
   * in any give time API might thorough error and it will be easier to handle it
   * if we return promise from here
   */
  const responsePromise = await new Promise<T>((resolve, reject) => {
    window
      .fetch(url, {
        method,
        body,
        headers,
      })
      .then(async (response) => {
        if (response.ok) {
          resolve((await response.json()) as T)
          // This will execute if the request doesn't have any error but data might not be present in the response
        } else {
          reject(new Error(await response.text()))
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
  return responsePromise
}
