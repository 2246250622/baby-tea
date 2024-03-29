// o
import is from './is'

/**
 * Parse the specified dot notation into an iterable string array.
 */
function fromDotNotation (path: string): string[] {
  const pathParts = path.split('.')
  const parts: string[] = []
  let index = 0

  while (index < pathParts.length) {
    let parsedPart = pathParts[index]

    while (parsedPart[parsedPart.length - 1] === '\\' &&
        pathParts[index + 1] !== undefined &&
        pathParts[index + 1] !== null) {
      parsedPart = `${parsedPart.slice(0, -1)}.`
      index += 1
      parsedPart += pathParts[index]
    }

    index += 1

    parts.push(parsedPart)
  }

  return parts
}

/**
 * Build array of strings into dot notation path
 */
function toDotNotation (paths: string[]): string {
  return paths
    .map((part): string => part
      .replace('.', '\\.'))
    .join('.')
}

/**
 * Export dot notation functions under single export
 */
export const dotNotation = {
  from: fromDotNotation,
  to: toDotNotation
}

/**
 * Check if all args specified are objects
 */
export function valid (...args: any[]): boolean {
  return is.apply(null, args)
}
