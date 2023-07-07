import fs from 'fs';
import path from 'path';
import { assertComponentNameIsValid, generateComponentFileContent, generateComponentMarkdownText } from './utils.js';
import { PROJECT_COMPONENTS_DIRECTORY, PROJECT_DIRECTORY_PATH, PROJECT_RELATIVE_COMPONENTS_DIRECTORY } from '../config.js';

export enum FileType {
  Component = 'Component',
  Markdown = 'Markdown'
};

export function createFile(componentName: string, fileType: FileType) {
  assertComponentNameIsValid(componentName);
  const filePath = getFilePath(componentName, fileType);
  const content = generateFileContent(componentName, fileType);
  createComponentFile({ filePath, content });
}

function getFilePath(componentName: string, fileType: FileType) {
  return fileType === FileType.Component ?
    getComponentFilePath(componentName) :
    getComponentMarkDownFilePath(componentName);
}

function generateFileContent(componentName: string, fileType: FileType) {
  return fileType === FileType.Component ?
    generateComponentFileContent(componentName) :
    generateComponentMarkdownText(componentName);
}

function getComponentMarkDownFilePath(componentName: string) {
  return path.join(PROJECT_DIRECTORY_PATH, 'docs', `${componentName}.md`)
}

function getComponentFilePath(componentName: string) {
  return path.join(PROJECT_COMPONENTS_DIRECTORY, `${componentName}.ts`);
}

export function appendToFile(relativePath: string, content: string) {
  const filePath = path.join(PROJECT_DIRECTORY_PATH, relativePath);
  fs.appendFileSync(filePath, content);
  console.log(`UPDATED ${relativePath}`);
}

export function addComponentToExports(componentName: string) {
  assertComponentNameIsValid(componentName);
  const relativePath = path.join(PROJECT_RELATIVE_COMPONENTS_DIRECTORY, 'index.ts');
  const exportStatement = `\nexport * from './${componentName}';`;
  appendToFile(relativePath, exportStatement);
}

export function addMarkDownComponentReference(componentName: string) {
  assertComponentNameIsValid(componentName);
  let markdownContent = `\n* [${componentName}](./docs/${componentName}.md) `;
  appendToFile('components.md', markdownContent);
}

interface CreatFileOptions {
  filePath: string;
  content: string;
}

function createComponentFile(options: CreatFileOptions) {
  assertFileDoesNotExist(options.filePath, `File already exists: ${options.filePath}`);
  fs.writeFileSync(options.filePath, options.content);
  console.log(`CREATED ${options.filePath}`);
}

function assertFileDoesNotExist(filePath: string, message: string) {
  if (fs.existsSync(filePath)) {
    console.error(message);
    process.exit(1);
  }
}