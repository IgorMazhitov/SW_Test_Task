/**
 * Atomic design exports
 * 
 * This file exports components from the atomic design structure:
 * - atoms: smallest building blocks
 * - molecules: small groups of atoms
 * - organisms: larger groups of molecules and/or atoms
 * - templates: page-level layouts with placement of organisms
 * - pages: specific instances of templates
 */

// Export atoms
export * from './atoms/table';
export { default as Button } from './atoms/Button';
export { default as TextInput } from './atoms/TextInput';
export { default as SelectInput } from './atoms/SelectInput';
export { default as ModalContainer } from './atoms/ModalContainer';

// Export molecules
export * from './molecules/modals';
export * from './molecules/table';
export * from './molecules/auth';

// Export organisms
export * from './organisms';

// Export templates (when available)
// export * from './templates';

// Export pages (when available)
// export * from './pages';
