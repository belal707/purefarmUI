// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  KEYCLOAK_URL: 'https://ec2-13-232-242-160.ap-south-1.compute.amazonaws.com:8443/auth',
  KEYCLOAK_REALM: 'Purefarm',
  KEYCLOAK_CLIENTID: 'frontend_client',
  BACKEND_URL: 'http://localhost:9003/api',
  PROVIDER_ID: 'cec9a5dc-01fe-4df0-aeb8-57514072f69d'
};
