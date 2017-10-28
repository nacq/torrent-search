module.exports = (name) => {
    switch (name) {
        case 'The Pirate Bay':
            return require('./tpb')
        case 'Torrentz':
            return require('./torrentz')
    }
}
