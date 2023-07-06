import { Command } from 'commander';
import { assertComponentNameIsValid } from './utils.js';
import { addComponentToExports, createComponent } from './fs-access.js';

const program = new Command();

program
  .version('0.0.1')
  .description('CLI tool for scaffolding a new lit component');

program
  .command('create <componentname>')
  .description('Create a new TypeScript lit Component')
  .action((componentname: string) => {
    try {
      assertComponentNameIsValid(componentname);
      createComponent(componentname);
      addComponentToExports(componentname);

    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });

program.parse(process.argv);

