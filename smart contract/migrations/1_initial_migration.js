const Video = artifacts.require("video");

module.exports = function (deployer) {
  deployer.deploy(Video, "0x8816662763d0a5511e3D850D82bbef89cF4Cc30c", 2 );
};
