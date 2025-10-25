import { describe, it } from 'node:test';
import assert from 'node:assert';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('Integration Tests', () => {
  describe('Pipeline Configuration', () => {
    it('should have all required workflow files', () => {
      const workflowDir = path.join(process.cwd(), '.github/workflows');
      assert.ok(fs.existsSync(workflowDir), 'Workflows directory should exist');

      const requiredWorkflows = [
        'dev-ci.yml',
        'qa-ci.yml',
        'staging-ci.yml',
        'production-deploy.yml'
      ];

      requiredWorkflows.forEach(workflow => {
        const workflowPath = path.join(workflowDir, workflow);
        assert.ok(
          fs.existsSync(workflowPath),
          `Workflow ${workflow} should exist`
        );
      });
    });

    it('should have valid YAML in workflow files', () => {
      const workflowDir = path.join(process.cwd(), '.github/workflows');
      const workflows = fs.readdirSync(workflowDir).filter(f => f.endsWith('.yml'));

      workflows.forEach(workflow => {
        const workflowPath = path.join(workflowDir, workflow);
        const content = fs.readFileSync(workflowPath, 'utf8');

        // Basic YAML validation - should not throw
        assert.ok(content.includes('name:'), `${workflow} should have a name`);
        assert.ok(content.includes('jobs:'), `${workflow} should have jobs`);
      });
    });
  });

  describe('Spec-Kit Structure', () => {
    it('should have constitution file', () => {
      const constitutionPath = path.join(process.cwd(), '.speckit/constitution.md');
      assert.ok(
        fs.existsSync(constitutionPath),
        'Constitution file should exist'
      );
    });

    it('should have specifications', () => {
      const specsDir = path.join(process.cwd(), 'specs');
      assert.ok(fs.existsSync(specsDir), 'Specs directory should exist');

      const specs = fs.readdirSync(specsDir).filter(f => f.endsWith('.spec.md'));
      assert.ok(specs.length > 0, 'Should have at least one specification');
    });
  });

  describe('Docker Configuration', () => {
    it('should have Dockerfile', () => {
      const dockerfilePath = path.join(process.cwd(), 'Dockerfile');
      assert.ok(fs.existsSync(dockerfilePath), 'Dockerfile should exist');
    });

    it('should have valid Dockerfile syntax', () => {
      const dockerfilePath = path.join(process.cwd(), 'Dockerfile');
      const content = fs.readFileSync(dockerfilePath, 'utf8');

      assert.ok(content.includes('FROM'), 'Dockerfile should have FROM instruction');
      assert.ok(content.includes('WORKDIR'), 'Dockerfile should have WORKDIR');
      assert.ok(content.includes('CMD') || content.includes('ENTRYPOINT'),
        'Dockerfile should have CMD or ENTRYPOINT');
    });
  });

  describe('Agent Execution', () => {
    it('should execute agent with --version flag', () => {
      const output = execSync('node src/agent/index.js --version', {
        encoding: 'utf8',
        cwd: process.cwd()
      });

      assert.ok(output.trim().length > 0, 'Version should be returned');
    });

    it('should execute agent with --help flag', () => {
      const output = execSync('node src/agent/index.js --help', {
        encoding: 'utf8',
        cwd: process.cwd()
      });

      assert.ok(output.includes('Usage'), 'Help text should include Usage');
      assert.ok(output.includes('Options'), 'Help text should include Options');
    });

    it('should execute agent with --status flag', () => {
      const output = execSync('node src/agent/index.js --status', {
        encoding: 'utf8',
        cwd: process.cwd()
      });

      const status = JSON.parse(output.match(/\{[\s\S]*\}/)[0]);
      assert.ok(status.name, 'Status should include name');
      assert.ok(status.version, 'Status should include version');
      assert.ok(status.status, 'Status should include status field');
    });
  });
});
