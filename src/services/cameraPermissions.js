import { Permissions } from "expo";

export async function waitforCameraPermissions() {
  try {
    return await waitUntil(async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") return true;
    });
  } catch (e) {
    console.warn(e);
  }
}

function waitUntil(predicate) {
  return new Promise((resolve, reject) => {
    let timer = setInterval(() => {
      let result;

      try {
        result = predicate();

        if (result) {
          clearInterval(timer);
          resolve(result);
        }
      } catch (e) {
        clearInterval(timer);
        reject(e);
      }
    }, 1000);
  });
}

export async function checkCameraPermissions() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === "granted";
}
