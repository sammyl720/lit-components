import fs from 'fs';
import path from 'path';
import { generateComponentFileContent } from './utils.js';

export function createComponent(componentName: string) {
  const filePath = path.join(process.cwd(), 'src', 'components', `${componentName}.ts`);

  if (fs.existsSync(filePath)) {
    console.error(`Component ${componentName} already exists.`);
    process.exit(1);
  }

  createComponentFile({
    componentName,
    filePath
  });
}

export function addComponentToExports(componentname: string) {
  const relativePath = path.join('src', 'components', 'index.ts');
  const filePath = path.join(process.cwd(), relativePath);

  const exportStatement = `\nexport * from './${componentname}';`;

  fs.appendFileSync(filePath, exportStatement);
  console.log(`UPDATED ${relativePath}`);
}

interface CreateComponetFileOptions {
  componentName: string;
  filePath: string;
}

function createComponentFile(options: CreateComponetFileOptions) {
  const content = generateComponentFileContent(options.componentName);
  fs.writeFileSync(options.filePath, content);
  console.log(`CREATED ${options.filePath}`);
}
