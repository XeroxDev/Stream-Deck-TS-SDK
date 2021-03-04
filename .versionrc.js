module.exports = {
    'sign': true,
    'commit-all': true,
    'scripts': {
        'postbump': 'npm run documentation && git add docs && git commit -m "docs: updated to newest version"'
    },
    'types': [
        {'type': 'feat', 'section': 'Features'},
        {'type': 'fix', 'section': 'Bug Fixes'},
        {'type': 'refactor', 'section': 'Refactors'},
        {'type': 'docs', 'section': 'Documentation'},
        {'type': 'perf', 'section': 'Performance'},
        {'type': 'chore', 'hidden': true},
        {'type': 'style', 'hidden': true},
        {'type': 'test', 'hidden': true},
        {'type': 'ci', 'hidden': true}
    ]
};
