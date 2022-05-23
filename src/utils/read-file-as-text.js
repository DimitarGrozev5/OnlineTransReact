// Function that reads a text file and returns a promise
export const ReadFileAsText = (file) =>
  new Promise((resolve, reject) => {
    const promise = new FileReader();
    promise.addEventListener("load", (event) => {
      resolve(event.target.result);
    });
    promise.addEventListener("error", () => reject());
    promise.readAsText(file);
  });