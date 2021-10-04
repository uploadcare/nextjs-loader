export const addEnvVar = (key: string, value: string): void => {
  process.env = Object.assign(process.env, { [key]: value });
}
export const removeEnvVar = (key: string): void => {
  delete process.env[key];
}
