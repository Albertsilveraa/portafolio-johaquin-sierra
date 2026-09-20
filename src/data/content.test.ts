import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { profile } from './profile';

const publicDir = join(process.cwd(), 'public');

describe('projects data', () => {
  it('has exactly 4 projects with unique codes', () => {
    expect(projects).toHaveLength(4);
    expect(new Set(projects.map((p) => p.code)).size).toBe(4);
  });

  it.each(projects.map((p) => [p.code, p] as const))(
    '%s has required non-empty fields',
    (_code, project) => {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(0);
      expect(project.metric.length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.assets.length).toBeGreaterThan(0);
    },
  );

  it.each(projects.map((p) => [p.code, p] as const))(
    '%s coverImage and assets resolve to real files',
    (_code, project) => {
      expect(existsSync(join(publicDir, project.coverImage))).toBe(true);
      for (const asset of project.assets) {
        expect(existsSync(join(publicDir, asset.href))).toBe(true);
      }
    },
  );
});

describe('profile data', () => {
  it('has 3 scoreboard metrics and 4 disciplines', () => {
    expect(profile.scoreboard).toHaveLength(3);
    expect(profile.disciplines).toHaveLength(4);
  });

  it('content evidence PDF exists', () => {
    expect(existsSync(join(publicDir, profile.contentEvidence.href))).toBe(true);
  });

  it('has a valid contact email', () => {
    expect(profile.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});
