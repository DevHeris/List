
```markdown
# Node.js File Explorer

## Overview

This Node.js script explores the file system using the "fs" module and implements the lstat function to gather information about files and folders. The script utilizes promises, async/await, and the Promise.all helper method for efficient processing. The chalk npm package is employed to add color differentiation, using red for folders and blue for files.

## Implementation

The lstat function is wrapped within a promise, and async/await is used in combination with Promise.all for optimal execution.

## Usage

```bash
nls [target-directory]
```

- If a target directory is provided, it will be explored; otherwise, the current working directory is used.

## Examples

Explore the current working directory:

```bash
nls
```

Explore a specific directory:

```bash
nls /path/to/directory
```

## Dependencies

- Node.js
- chalk npm package
