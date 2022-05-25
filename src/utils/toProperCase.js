export const toProperCase = sentence => {

  const wordsInTitle = sentence.split(" ")
  const properCaseWordsInTitle = wordsInTitle.map(word => {
    const firstLetter = word[0]
    const restOfWord = word.slice(1)
    const upperCaseWord = firstLetter.toUpperCase() + restOfWord
    return upperCaseWord
  })

  let concatenatedSentence = ''
  properCaseWordsInTitle.forEach((word, index) => {
    concatenatedSentence += (index !== 0 ? ` ${word}` : word)
  })

  return concatenatedSentence
}