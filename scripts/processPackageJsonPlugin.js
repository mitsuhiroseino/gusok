import fs from 'fs-extra';
import path from 'path';
import { readPackageSync } from 'read-pkg';
import { writePackageSync } from 'write-pkg';

const WORKSPACE_DEPS = /^(?:\*|workspace:.+|portal:.+)$/;
const MAIN_PROPS = ['name', 'version', 'author', 'license'];
function processPackageJson(options = {}) {
  const {
    base = {},
    inputDir,
    outputDir
  } = options;
  return {
    name: 'process-package-json',
    generateBundle: async (outputOptions, bundle) => {
      const options = {
        normalize: false
      };
      if (inputDir) {
        options.cwd = inputDir;
      }
      const orgPackageJson = readPackageSync(options);
      const packageJson = typeof base === 'function' ? base(orgPackageJson) : {
        ...base
      };
      const imports = Object.values(bundle).reduce((result, chunk) => {
        if ('imports' in chunk) {
          chunk.imports.forEach(item => {
            result.add(item);
          });
        }
        return result;
      }, new Set());
      const orgDeps = orgPackageJson.dependencies || {};
      const tempDeps = {};
      imports.forEach(item => {
        if (!item.endsWith('.js')) {
          const tokens = item.split(/[/\\]/);
          if (tokens.length === 1) {
            const pkg = tokens[0];
            if (pkg in orgDeps) {
              tempDeps[pkg] = orgDeps[pkg];
            }
          } else {
            const pkg = `${tokens[0]}/${tokens[1]}`;
            if (pkg in orgDeps) {
              tempDeps[pkg] = orgDeps[pkg];
            }
          }
        }
      });
      if (packageJson.dependencies) {
        Object.assign(tempDeps, packageJson.dependencies);
      }
      for (const pkg in tempDeps) {
        if (WORKSPACE_DEPS.test(tempDeps[pkg])) {
          const pkgJson = _getPckageJson(pkg);
          tempDeps[pkg] = pkgJson.version;
        }
      }
      const dependencies = {};
      Object.keys(tempDeps).sort().forEach(pkg => {
        dependencies[pkg] = tempDeps[pkg];
      });
      packageJson.dependencies = dependencies;
      for (const prop of MAIN_PROPS) {
        if (!packageJson[prop] && orgPackageJson[prop]) {
          packageJson[prop] = orgPackageJson[prop];
        }
      }
      const outputPath = outputDir || outputOptions.dir || path.dirname(outputOptions.file);
      writePackageSync(outputPath, packageJson, {
        indent: 2
      });
    }
  };
}
function _getPckageJson(pkg) {
  const currentPath = path.resolve('.');
  const parentPath = path.dirname(currentPath);
  const pkgJsonPath = path.join(parentPath, pkg, 'package.json');
  return fs.readJsonSync(pkgJsonPath);
}

export { processPackageJson as default };
