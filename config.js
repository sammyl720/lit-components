import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const PROJECT_DIRECTORY_PATH = dirname(__filename);
export const PROJECT_RELATIVE_COMPONENTS_DIRECTORY = path.join('src', 'components');
export const PROJECT_COMPONENTS_DIRECTORY = path.join(PROJECT_DIRECTORY_PATH, PROJECT_RELATIVE_COMPONENTS_DIRECTORY);
export const PROJECT_RELATIVE_MARKDOWN_DIRECTORY = "docs";
export const MARKDOWM_COMPONENT_LIST_NAME = 'components.md';