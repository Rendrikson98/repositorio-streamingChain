// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

struct transferManagement {
    address payable accountAddress;
    uint percent;
}

struct videoStruct {
    uint totalViews;
    uint retentionRate;
    uint totalViewingTime;
    address payable contentCreatorAddress;
    address payable platformAddress;
}

contract Video{
    address payable public owner;
    uint thousandthView = 0;
    uint cpm = 0;
    videoStruct videoData;
    transferManagement[] listAccountTransfer;

    constructor(address payable _contentCreatorAddress, uint _cpmValue) payable{
        owner = payable(msg.sender);
        videoData.totalViews = 0;
        videoData.retentionRate = 0;
        videoData.totalViewingTime = 0;
        videoData.contentCreatorAddress = payable(_contentCreatorAddress);
        videoData.platformAddress = payable(msg.sender);
        cpm = _cpmValue;
    }

    modifier onlyBy(){
        require(msg.sender == owner, "Voce nao e dono do contrato");
        _;
    }


    function getInfoVideo() public view returns (videoStruct memory){
        return videoData;
    }

    function getTotalView() public view returns(uint){
        return videoData.totalViews;
    }

    function getRetentionRate() public view returns(uint){
        return videoData.retentionRate;
    }

    function getTotalViewingTime() public view returns(uint){
        return videoData.totalViewingTime;
    }

    function updateInfoVideo(uint assistedTime ) public onlyBy{
        uint _totalview = videoData.totalViews + 1;
        uint _retentionRate = (videoData.retentionRate + assistedTime) / _totalview;
        uint _totalViewingTime = videoData.totalViewingTime + assistedTime;

        videoData.totalViews = _totalview;
        videoData.retentionRate = _retentionRate;
        videoData.totalViewingTime = _totalViewingTime;

        thousandthView = thousandthView + 1;

        if( thousandthView == 5 ){
            thousandthView = 0;
            makePayment(1);
        }
    }

    function addTransfer(address payable _accountAddress, uint _percent) public onlyBy{
        require(_percent <= 100, "A porcentagem nao pode ser maior que 100");
    
        uint newTotalPercent = _percent;
        for (uint i = 0; i < listAccountTransfer.length; i++) {
            newTotalPercent += listAccountTransfer[i].percent;
            require(_accountAddress != listAccountTransfer[i].accountAddress, "A conta escolhida ja possui valores de transferencia registrados. Para adicionar um novo valor remova o valor anterior ");
        }
        
        require(newTotalPercent <= 100, "O total de porcentagem eh maior 100");
        
        transferManagement memory newTransfer = transferManagement(_accountAddress, _percent);
        listAccountTransfer.push(newTransfer);
    }

    function viewAccountsTransfer() public view returns (transferManagement[] memory) {
        return listAccountTransfer;
    }

    function removeTransferByAddress(address payable _accountAddress) public onlyBy{
        for (uint i = 0; i < listAccountTransfer.length; i++) {
            if (listAccountTransfer[i].accountAddress == _accountAddress) {
                
                listAccountTransfer[i] = listAccountTransfer[listAccountTransfer.length - 1];
                
                listAccountTransfer.pop();
                
                break;
            }
        }
    }

    function makePayment(uint _value) private onlyBy {
        require(_value > 0, "O valor precisa ser maior que 0");

        uint totalPercent = 0;

        for (uint i = 0; i < listAccountTransfer.length; i++) {
            totalPercent += listAccountTransfer[i].percent;
        }

        uint totalPayments = 0;

        for (uint i = 0; i < listAccountTransfer.length; i++) {
            transferManagement memory transfer = listAccountTransfer[i];
            uint paymentAmount = (_value * 10 * transfer.percent * 100) / 10000;

            transfer.accountAddress.transfer(paymentAmount);
            totalPayments += paymentAmount;
        }

        uint remainingPercent = 100 - totalPercent;

        if (remainingPercent > 0) {
            uint remainingValue = (_value * 10 * remainingPercent * 100) / 10000;

            videoData.contentCreatorAddress.transfer(remainingValue);
        }
    }
    
    
    function balanceOf() public view returns(uint){
        return address(this).balance;
    }

    function notifyLowBalance() public view returns (bool) {
        uint threshold = 1 ether;
        return address(this).balance < threshold;
    }

    receive() external payable { }

}