import { DataService } from 'src/app/shared/services/data.service';
import { WebapibaseService } from 'src/app/modules/requests/services/webapibase.service';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  configFile: 'assets/configuration/app.configuration.json',
  repository: WebapibaseService
};
