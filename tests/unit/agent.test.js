import { describe, it } from 'node:test';
import assert from 'node:assert';
import MapAgent from '../../src/agent/index.js';

describe('MapAgent', () => {
  describe('initialization', () => {
    it('should create a new agent instance', () => {
      const agent = new MapAgent();
      assert.ok(agent);
      assert.strictEqual(agent.name, 'PR-CYBR-MAP-AGENT');
      assert.strictEqual(agent.agentId, 'A-15');
      assert.strictEqual(agent.version, '1.0.0');
    });

    it('should initialize with correct status', () => {
      const agent = new MapAgent();
      assert.strictEqual(agent.status, 'initializing');
    });
  });

  describe('getStatus', () => {
    it('should return agent status', () => {
      const agent = new MapAgent();
      const status = agent.getStatus();

      assert.ok(status);
      assert.strictEqual(status.name, 'PR-CYBR-MAP-AGENT');
      assert.strictEqual(status.agentId, 'A-15');
      assert.strictEqual(status.version, '1.0.0');
      assert.ok(status.timestamp);
    });
  });

  describe('processThreatData', () => {
    it('should process threat data', async () => {
      const agent = new MapAgent();
      const testData = [
        { type: 'malware', location: 'US' },
        { type: 'phishing', location: 'UK' }
      ];

      const result = await agent.processThreatData(testData);

      assert.ok(result);
      assert.strictEqual(result.processed, true);
      assert.strictEqual(result.dataPoints, 2);
      assert.ok(result.timestamp);
    });

    it('should handle empty data', async () => {
      const agent = new MapAgent();
      const result = await agent.processThreatData([]);

      assert.ok(result);
      assert.strictEqual(result.processed, true);
      assert.strictEqual(result.dataPoints, 0);
    });
  });
});
