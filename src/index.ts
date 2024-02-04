import Ajv from "ajv";
import chalk from "chalk";
import { program } from "commander";
import schemas from "./types.schema.json";

console.log(chalk.green("Initializing..."));

const ajv = new Ajv({
  allErrors: true,
});

// const client = new DynamoDBClient({
//   endpoint: "http://127.0.0.1:4566"
// });

// const organizationRepository = DynamoDbOrganizationRepository(client);

program
  .command("create")
  .description(
    "Creates a new organization with a provided name and returns its identifier"
  )
  .argument("organizationName", "A new organization name")
  .action(async (name: string) => {
    try {
      const putorg = ajv.compile(schemas.definitions.PutOrganization);

      const result = putorg(JSON.parse("{}"));

      if (!result) {
        console.log(chalk.red(JSON.stringify(putorg.errors)));
      }

      // console.log(chalk.green(`Creating a new organization with name: ${name}`));

      // const {id} = await organizationRepository.create(name);

      // console.log(chalk.green(`Successfully created: ${id}!`));
    } catch (error) {
      console.log(
        chalk.red("Something went wrong while creating an organization:")
      );

      console.log(error);
    }
  });

program
  .command("getById")
  .description("Retuns compete organization information")
  .argument("organizationId", "The organization id to get")
  .action(async (organizationId: string) => {
    try {
      // console.log(chalk.green(`Retrieving organization with id: ${organizationId}`));
      // const organization = await organizationRepository.getById(organizationId);
      // console.log(chalk.green(`Organization details:`));
      // console.log(chalk.green(JSON.stringify(organization)));
    } catch (error) {
      console.log(
        chalk.red("Something went wrong while retrieving an organization:")
      );

      console.log(error);
    }
  });

program.parse();

process.on("exit", () => {
  // client.destroy();
  console.log(chalk.green("Gracefully terminated."));
});
