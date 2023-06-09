

export const CreateIrl = async (data: any) => {
  try {
    const { metaplex, name, symbol, getUri } = data

    let createTx;

    try {
      createTx = await metaplex.nfts().create({
        uri: getUri,
        name: name,
        symbol: symbol,
        sellerFeeBasisPoints: 500, // Represents 5.00%.
      });

    } catch (error: any) {
      if (error.name === 'AccountNotFoundError') {
        return true
      } else {
        return false
      }

    }

  } catch (error) {
    console.log('error', error)

  }
}