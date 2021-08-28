import { providers } from 'ethers';

function getLibrary(provider) {
    const library = new providers.Web3Provider(provider);
    return library;
}

export default getLibrary;