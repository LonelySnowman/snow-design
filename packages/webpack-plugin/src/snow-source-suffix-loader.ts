export default function snowSourceSuffixLoader(source: string) {
    return source.replace(/(import\s+|require\s*\(\s*)['"]([^'"]+)(\.css)['"]/g, '$1\'$2.scss\'');
}

