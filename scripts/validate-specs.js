#!/usr/bin/env node

/**
 * Validates all specification files in the specs directory
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specsDir = path.join(__dirname, '../specs');
const constitutionPath = path.join(__dirname, '../.speckit/constitution.md');

let errors = 0;

console.log('Validating Spec-Kit files...\n');

// Check constitution
if (!fs.existsSync(constitutionPath)) {
  console.error('❌ Constitution file not found at:', constitutionPath);
  errors++;
} else {
  const content = fs.readFileSync(constitutionPath, 'utf8');
  if (content.length < 100) {
    console.error('❌ Constitution file is too short');
    errors++;
  } else {
    console.log('✅ Constitution file is valid');
  }
}

// Check specs directory
if (!fs.existsSync(specsDir)) {
  console.error('❌ Specs directory not found at:', specsDir);
  errors++;
} else {
  const specs = fs.readdirSync(specsDir).filter(f => f.endsWith('.spec.md') || f.endsWith('.spec.yaml'));
  
  if (specs.length === 0) {
    console.error('❌ No specification files found in specs directory');
    errors++;
  } else {
    console.log(`✅ Found ${specs.length} specification file(s)`);
    
    specs.forEach(spec => {
      const specPath = path.join(specsDir, spec);
      const content = fs.readFileSync(specPath, 'utf8');
      
      if (content.length < 100) {
        console.error(`❌ Specification ${spec} is too short`);
        errors++;
      } else {
        // Check for required sections
        const hasOverview = content.includes('## Overview') || content.includes('# Overview');
        const hasRequirements = content.includes('Requirements') || content.includes('requirements');
        
        if (!hasOverview) {
          console.warn(`⚠️  Specification ${spec} missing Overview section`);
        }
        if (!hasRequirements) {
          console.warn(`⚠️  Specification ${spec} missing Requirements section`);
        }
        
        console.log(`✅ Specification ${spec} is valid`);
      }
    });
  }
}

console.log(`\nValidation complete. ${errors} error(s) found.`);

if (errors > 0) {
  process.exit(1);
}
