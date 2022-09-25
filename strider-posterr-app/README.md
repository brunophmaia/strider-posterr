It's necessary to install Node.js /npm.

https://nodejs.org/en/download/package-manager/

Inside of the strider-posterr-app folder run the commands bellow:

Install angular CLI:

```npm install -g @angular/cli```

Allow the execution of PowerShell scripts on Windows:

```Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned```

Install dependencies:

```npm install```

Run project:

```ng s```

By default the application will start in http://localhost:4200. If necessary the option ```--port <portNumber>``` can be added in the ```ng s``` command.