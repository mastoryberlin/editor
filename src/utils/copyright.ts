import pkg from '../../package.json'

export default `/**
 * ${pkg.name} ${pkg.version}
 * @license ${pkg.license}
 * @author ${pkg.authors[0].name} ${pkg.authors[0].url}
 * @see ${pkg.homepage}
 **/
`

export const consoleCopyright = () => {}

export const { version } = pkg
