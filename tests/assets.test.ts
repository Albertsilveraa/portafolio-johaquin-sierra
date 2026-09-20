import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

const expectedDocs = [
  'zeifir-catalogo.pdf',
  'zeifir-contenido-tiktok.pdf',
  'zeifir-posts-productos.pdf',
  'vintage-plan-de-negocio.pdf',
  'vintage-carta.pdf',
  'estrategia-comercial-barrington.pdf',
  'gringos-reclutamiento.pdf',
  'marca-personal-contenido.pdf',
];

const expectedCovers = [
  'prj-01-cover.png',
  'prj-02-cover.png',
  'prj-03-cover.png',
  'prj-04-cover.png',
];

describe('portfolio assets', () => {
  it.each(expectedDocs)('public/docs/%s exists', (file) => {
    expect(existsSync(join(root, 'public/docs', file))).toBe(true);
  });

  it.each(expectedCovers)('public/images/%s exists', (file) => {
    expect(existsSync(join(root, 'public/images', file))).toBe(true);
  });
});
