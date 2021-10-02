const addEnvVar = (key, value) => {
  process.env = Object.assign(process.env, { [key]: value });
}
const removeEnvVar = (key) => {
  delete process.env[key];
}

module.exports = {
  addEnvVar,
  removeEnvVar
}
