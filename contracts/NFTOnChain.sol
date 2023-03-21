// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";

contract NFTOnChain is ERC721, Ownable {
  using Strings for uint;
  address receiver = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

  struct Word { 
    string name;
    string description;
    string numBg;
    string numText;
    string value;
  }

  uint nextNFT;
  string[] public wordsArray = ["toto","tata","titi","tutu","tete"];
  mapping (uint => Word) public words;

  constructor() ERC721("BibsOnChain", "BIBS") {}

  function getRandom(bool _word) private view returns(uint) {
        uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, nextNFT)));
        uint modulo = _word ? wordsArray.length : 361;
        return (random % modulo);
    }

  function buildImage(uint _tokenId) private view returns(string memory) {
    Word memory currentWord = words[_tokenId];
    return Base64.encode(abi.encodePacked(
        '<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">',
        '<rect height="300" width="300" fill="hsl(',currentWord.numBg,',  100%, 80%)"/>',
        '<text x="50%" y="50%" dominant-baseline="middle" fill="hsl(',currentWord.numText,', 30%, 30%)" text-anchor="middle" font-size="41">',currentWord.value,'</text>',
        '</svg>'
    ));
  }

  function buildMetadata(uint _tokenId) private view returns(string memory) {
      Word memory currentWord = words[_tokenId];
      return string(abi.encodePacked(
        'data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
          '{"name":"', 
          currentWord.name,
          '", "description":"', 
          currentWord.description,
          '", "image": "', 
          'data:image/svg+xml;base64,', 
          buildImage(_tokenId),
          '"}'
      )))));
  }

  function tokenURI(uint _tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(_tokenId),
      "Nonexistent token"
    );
    return buildMetadata(_tokenId);
  }

  function mint(uint _amount) external payable {
    nextNFT++;
    require(_amount > 0);
    require(msg.value >= 0.0001 ether * _amount);

    Word memory newWord = Word(
        string(abi.encodePacked('Bibs #', nextNFT.toString())), 
        "I love Bibs !",
        getRandom(false).toString(),
        getRandom(false).toString(),
        wordsArray[getRandom(true)]
    );

    words[nextNFT] = newWord;
    for (uint i = 0; i < _amount; i++) {
      _safeMint(msg.sender, nextNFT);
    }
  }

  function withdraw() external payable onlyOwner {
    (bool res, ) = payable(receiver).call{value: address(this).balance}("");
    require(res);
  }
}