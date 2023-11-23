# Introduction

While developing this cli, many custom schematics were created to assist the cli in file generation.

The following new commands are available to the user if they wish to expedite a manual setup of their server

-`service-prisma` : Creates a new `prisma.service.ts` and adds it as a provider to `app.module.ts`
-`prisma` : Adds a sample `User` model to the `schema.prisma` file
-`service-user` : Adds the necessary imports for `@techsavvyash/user-service` in `app.module.ts` 
-`fixtures`  : Generate the docker related files along with the shell sciripts needed to run the `pre-commit` file in husky
-`husky` : Creates the `pre-commit` file in the `.husky` folder
-`github` : Creates a new `.github` folder and the `ISSUE_TEMPLATE` and `Workflow` subdirectory in it.
-`devcontainer` : Generates the `devcontainer.json` in the .devcontainer directory.
