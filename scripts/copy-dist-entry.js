const fs = require('fs');
const path = require('path');

const source = path.join(process.cwd(), 'dist', 'src', 'main.js');
const target = path.join(process.cwd(), 'dist', 'main.js');
const prismaSource = path.join(process.cwd(), 'src', 'generated', 'prisma');
const prismaTarget = path.join(process.cwd(), 'dist', 'src', 'generated', 'prisma');

if (!fs.existsSync(source)) {
  throw new Error(`Build entry not found: ${source}`);
}

fs.copyFileSync(source, target);

function copyRecursive(from, to) {
  if (!fs.existsSync(from)) {
    return;
  }

  fs.mkdirSync(to, { recursive: true });

  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const sourcePath = path.join(from, entry.name);
    const targetPath = path.join(to, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(sourcePath, targetPath);
      continue;
    }

    try {
      fs.copyFileSync(sourcePath, targetPath);
    } catch (error) {
      const isLockedPrismaEngine =
        entry.name === 'query_engine-windows.dll.node' &&
        fs.existsSync(targetPath) &&
        (error.code === 'EPERM' || error.code === 'UNKNOWN');

      if (isLockedPrismaEngine) {
        continue;
      }

      throw error;
    }
  }
}

copyRecursive(prismaSource, prismaTarget);
